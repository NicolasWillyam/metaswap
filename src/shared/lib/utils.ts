import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(addr: string, prefix = 4, suffix = 4): string {
  if (!addr || typeof addr !== "string") return "";
  const has0x = addr.startsWith("0x") || addr.startsWith("0X");
  const body = has0x ? addr.slice(2) : addr;
  if (body.length <= prefix + suffix) return addr;
  const start = body.slice(0, prefix);
  const end = body.slice(-suffix);
  return `${has0x ? "0x" : ""}${start}...${end}`;
}
