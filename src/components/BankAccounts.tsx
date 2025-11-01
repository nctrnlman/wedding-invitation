"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

type Account = { bank: string; name: string; number: string };

export default function BankAccounts({
  compact = true,
}: {
  compact?: boolean;
}) {
  const accounts: Account[] = [
    { bank: "BCA", name: "Daffa", number: "2330367426" },
    { bank: "BCA", name: "Elga", number: "2330283036" },
  ];

  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopied(num);
    setTimeout(() => setCopied(null), 1300);
  };

  const pad = compact ? "p-4" : "p-6";
  const titleSize = compact ? "text-xl" : "text-2xl";
  const numberSize = compact ? "text-base" : "text-lg";

  return (
    <section className="section bg-wedding wedding-corners relative overflow-hidden">
      <div className="container-page text-center space-y-7">
        <p
          className={`p-muted mx-auto ${
            compact ? "text-xs max-w-[40ch]" : "text-sm max-w-[48ch]"
          }`}
        >
          Tanpa mengurangi rasa hormat, bagi tamu undangan yang ingin memberikan
          hadiah pernikahan kepada kedua mempelai dapat dikirimkan melalui
          rekening di bawah ini.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {accounts.map((a) => (
            <article
              key={a.number}
              className={`paper relative rounded-2xl ${pad} transition-all hover:shadow-lg hover:-translate-y-0.5 text-left`}
              aria-label={`Rekening ${a.bank} a.n. ${a.name}`}
            >
              <div
                className={`absolute top-2 right-2 transition-opacity ${
                  copied === a.number ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={copied !== a.number}
              >
                <span className="pill-gold text-[11px]">Copied</span>
              </div>

              <div className="flex items-center justify-between">
                <div className={`font-display ${titleSize} text-coffee`}>
                  {a.bank}
                </div>
              </div>

              {/* Name */}
              <div className="p-muted text-sm mt-1">a.n. {a.name}</div>

              {/* Number row */}
              <div className="mt-2 flex items-center justify-between gap-3">
                <div
                  className={`font-semibold tracking-wider text-coffee tabular-nums ${numberSize}`}
                >
                  {a.number}
                </div>

                <button
                  onClick={() => handleCopy(a.number)}
                  className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-coffee transition-colors"
                  aria-label={`Salin nomor ${a.number}`}
                >
                  {copied === a.number ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <span className="pointer-events-none absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold/10 blur-[2px]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
