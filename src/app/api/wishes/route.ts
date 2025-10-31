import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { Wish } from "@/types/wish";

const MAX_NAME = 40;
const MAX_MSG = 400;
const COLLECTION = "wedding_invitation"; // <- di sini

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
}

export async function GET() {
  await ensureIndexes();
  const db = await getDb();
  const col = db.collection<Wish>(COLLECTION);
  const items = await col
    .find({}, { projection: { ip: 0, ua: 0 } })
    .sort({ ts: -1 })
    .limit(300)
    .toArray();
  return NextResponse.json({ items }, { status: 200 });
}

export async function POST(req: NextRequest) {
  await ensureIndexes();
  const db = await getDb();
  const col = db.collection<Wish>(COLLECTION);

  const body = await req.json().catch(() => ({}));
  const name = cleanText(body?.name, MAX_NAME);
  const message = cleanText(body?.message, MAX_MSG);
  if (!name || !message) {
    return NextResponse.json(
      { error: "Nama & ucapan wajib diisi." },
      { status: 400 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.ip ||
    "unknown";
  const perMin = Number(process.env.WISHES_RATE_LIMIT_PER_MIN || 20);
  const now = Date.now();
  const oneMinAgo = now - 60_000;

  const recentCount = await col.countDocuments({ ip, ts: { $gte: oneMinAgo } });
  if (recentCount >= perMin) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Coba lagi sebentar." },
      { status: 429 }
    );
  }

  const doc: Wish = {
    name,
    message,
    ts: now,
    ip,
    ua: req.headers.get("user-agent") || "",
  };

  await col.insertOne(doc);

  return NextResponse.json(
    { item: { name: doc.name, message: doc.message, ts: doc.ts } },
    { status: 201 }
  );
}
