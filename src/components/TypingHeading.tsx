"use client";
import { useEffect, useState } from "react";

export default function TypingHeading({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setOut(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [text]);
  return <h1 className={`h1 typing-caret ${className}`}>{out}</h1>;
}
