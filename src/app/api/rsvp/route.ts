import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export type RsvpDoc = {
  name: string;
  attend: boolean;
  count: 1 | 2 | null;
  ts: number;
  ip: string;
  ua: string;
};

const MAX_NAME = 40;
const COLLECTION = "wedding_rsvp";

function cleanText(input: unknown, max: number) {
  if (typeof input !== "string") return "";
  const trimmed = input.trim().slice(0, max);
  return trimmed.replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " ");
}

async function ensureIndexes() {
  const db = await getDb();
  const col = db.collection(COLLECTION);
  await col.createIndex({ ts: -1 });
  await col.createIndex({ ip: 1, ts: -1 });
  await col.createIndex({ name: 1, ts: -1 });
}

function getClientIp(req: NextRequest) {
  const h = req.headers;
  const xff = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    xff ||
    h.get("x-real-ip") ||
    h.get("cf-connecting-ip") ||
    h.get("fly-client-ip") ||
    h.get("fastly-client-ip") ||
    h.get("true-client-ip") ||
    h.get("x-client-ip") ||
    h.get("x-cluster-client-ip") ||
    "unknown"
  );
}

function parseTime(val: string | null): number | null {
  if (!val) return null;
  const n = Number(val);
  if (!Number.isNaN(n) && n > 0) return n;
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? null : d.getTime();
}

export async function GET(req: NextRequest) {
  await ensureIndexes();
  const db = await getDb();
  const col = db.collection<RsvpDoc>(COLLECTION);

  const url = new URL(req.url);
  const sp = url.searchParams;

  // filter waktu opsional (?from=..., ?to=...)
  const fromTs = parseTime(sp.get("from"));
  const toTs = parseTime(sp.get("to"));
  const filter: Record<string, any> = {};
  if (fromTs || toTs) {
    filter.ts = {};
    if (fromTs) filter.ts.$gte = fromTs;
    if (toTs) filter.ts.$lte = toTs;
  }

  // limit & pagination sederhana
  const limit = Math.min(Math.max(Number(sp.get("limit") || 500), 1), 5000);

  // kalau mau hanya summary: ?only=summary
  const onlySummary = (sp.get("only") || "").toLowerCase() === "summary";

  // ITEMS (hide IP/UA)
  const items = onlySummary
    ? []
    : await col
        .find(filter, { projection: { ip: 0, ua: 0, _id: 0 } })
        .sort({ ts: -1 })
        .limit(limit)
        .toArray();

  // SUMMARY (mengikuti filter waktu yang sama)
  const totalDocs = await col.countDocuments(filter);
  const totalAttendDocs = await col.countDocuments({ ...filter, attend: true });
  const totalNotAttendDocs = totalDocs - totalAttendDocs;

  const agg = await col
    .aggregate<{ people: number }>([
      { $match: { ...filter, attend: true, count: { $in: [1, 2] } } },
      { $group: { _id: null, people: { $sum: "$count" } } },
      { $project: { _id: 0, people: 1 } },
    ])
    .toArray();
  const totalPeople = agg[0]?.people ?? 0;

  const summary = {
    generatedAt: new Date().toISOString(),
    range: {
      from: fromTs ? new Date(fromTs).toISOString() : null,
      to: toTs ? new Date(toTs).toISOString() : null,
    },
    total_records: totalDocs,
    total_attending_records: totalAttendDocs,
    total_not_attending_records: totalNotAttendDocs,
    total_attending_people: totalPeople, // sum(count) utk attend=true
  };

  return NextResponse.json(
    { items, summary },
    {
      status: 200,
      headers: {
        // memudahkan query dari Excel/PowerQuery lintas origin
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      },
    }
  );
}
export async function POST(req: NextRequest) {
  await ensureIndexes();
  const db = await getDb();
  const col = db.collection<RsvpDoc>(COLLECTION);

  const body = await req.json().catch(() => ({}));

  const name = cleanText(body?.name, MAX_NAME);
  const attend = Boolean(body?.attend);
  const rawCount = body?.count;

  let count: 1 | 2 | null = null;
  if (attend) {
    if (rawCount === 1 || rawCount === "1") count = 1;
    else if (rawCount === 2 || rawCount === "2") count = 2;
    else
      return NextResponse.json(
        { error: "Pilih jumlah kehadiran (1 atau 2 orang)." },
        { status: 400 }
      );
  }

  if (!name) {
    return NextResponse.json({ error: "Nama wajib diisi." }, { status: 400 });
  }

  // Rate limit per IP per menit
  const ip = getClientIp(req);
  const perMin = Number(process.env.RSVP_RATE_LIMIT_PER_MIN || 10);
  const now = Date.now();
  const oneMinAgo = now - 60_000;

  const recentCount = await col.countDocuments({ ip, ts: { $gte: oneMinAgo } });
  if (recentCount >= perMin) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Coba lagi sebentar." },
      { status: 429 }
    );
  }

  const doc: RsvpDoc = {
    name,
    attend,
    count,
    ts: now,
    ip,
    ua: req.headers.get("user-agent") || "",
  };

  await col.insertOne(doc);

  return NextResponse.json(
    {
      item: {
        name: doc.name,
        attend: doc.attend,
        count: doc.count,
        ts: doc.ts,
      },
    },
    { status: 201 }
  );
}
