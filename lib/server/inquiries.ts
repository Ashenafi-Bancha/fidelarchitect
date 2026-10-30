import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { InquiryInput } from "@/lib/inquiry-schema";

/**
 * File-backed inquiry store. Suitable for a single-server deployment with a
 * persistent disk (VPS, container with a volume). For serverless hosting,
 * swap these functions for a database (e.g. PostgreSQL) — the rest of the
 * app only uses the exported functions.
 */

export const STATUSES = ["new", "contacted", "qualified", "proposal", "won", "lost", "archived"] as const;
export type Status = (typeof STATUSES)[number];

export interface StoredFile {
  id: string;
  name: string;
  type: string;
  size: number;
  storedAs: string;
}

export interface Inquiry extends Omit<InquiryInput, "consent" | "website"> {
  id: string;
  ref: string;
  createdAt: string;
  updatedAt: string;
  status: Status;
  assignee?: string;
  notes: { at: string; text: string }[];
  files: StoredFile[];
  source?: string;
}

// Resolved at runtime; excluded from build tracing so the data folder is never bundled.
const DATA_DIR = path.resolve(/* turbopackIgnore: true */ process.cwd(), process.env.DATA_DIR || "./data");
const DB_FILE = path.join(DATA_DIR, "inquiries.json");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

let queue: Promise<unknown> = Promise.resolve();
/** Serialise writes so concurrent submissions cannot clobber each other. */
function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

async function readAll(): Promise<Inquiry[]> {
  try {
    return JSON.parse(await fs.readFile(DB_FILE, "utf8")) as Inquiry[];
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}

async function writeAll(list: Inquiry[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DB_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(list, null, 2), { mode: 0o600 });
  await fs.rename(tmp, DB_FILE);
}

function makeRef(date: Date) {
  const d = date.toISOString().slice(2, 10).replace(/-/g, "");
  return `FBG-${d}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
}

// Magic-number checks so a renamed executable cannot pass as an image.
function sniff(buf: Buffer): string | null {
  if (buf.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) return "image/jpeg";
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  if (buf.subarray(0, 5).toString("ascii") === "%PDF-") return "application/pdf";
  return null;
}

const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "application/pdf": "pdf" };

export async function saveFiles(inquiryId: string, files: File[]): Promise<StoredFile[] | { error: string }> {
  const out: StoredFile[] = [];
  const dir = path.join(UPLOAD_DIR, inquiryId);
  for (const f of files) {
    const buf = Buffer.from(await f.arrayBuffer());
    const type = sniff(buf);
    if (!type) return { error: `"${f.name}" is not a supported JPG, PNG, WebP or PDF file.` };
    const id = crypto.randomBytes(8).toString("hex");
    const storedAs = `${id}.${EXT[type]}`;
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, storedAs), buf, { mode: 0o600 });
    out.push({ id, name: f.name.replace(/[^\w.\- ()]/g, "_").slice(0, 120), type, size: buf.length, storedAs });
  }
  return out;
}

export async function createInquiry(input: Omit<Inquiry, "id" | "ref" | "createdAt" | "updatedAt" | "status" | "notes" | "files">, files: File[]) {
  const id = crypto.randomUUID();
  const saved = files.length ? await saveFiles(id, files) : [];
  if ("error" in saved) {
    await fs.rm(path.join(UPLOAD_DIR, id), { recursive: true, force: true });
    return saved;
  }
  const now = new Date();
  const record: Inquiry = {
    ...input,
    id,
    ref: makeRef(now),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    status: "new",
    notes: [],
    files: saved,
  };
  await withLock(async () => {
    const all = await readAll();
    all.unshift(record);
    await writeAll(all);
  });
  return record;
}

export async function listInquiries() {
  return readAll();
}

export async function getInquiry(id: string) {
  return (await readAll()).find((i) => i.id === id) ?? null;
}

export async function updateInquiry(id: string, patch: { status?: Status; assignee?: string; note?: string }) {
  return withLock(async () => {
    const all = await readAll();
    const item = all.find((i) => i.id === id);
    if (!item) return null;
    if (patch.status) item.status = patch.status;
    if (patch.assignee !== undefined) item.assignee = patch.assignee || undefined;
    if (patch.note) item.notes.push({ at: new Date().toISOString(), text: patch.note });
    item.updatedAt = new Date().toISOString();
    await writeAll(all);
    return item;
  });
}

export function filePath(inquiryId: string, storedAs: string) {
  // ids are generated by us; still guard against path traversal
  if (!/^[\w-]+$/.test(inquiryId) || !/^[a-f0-9]+\.(jpg|png|webp|pdf)$/.test(storedAs)) return null;
  return path.join(UPLOAD_DIR, inquiryId, storedAs);
}
