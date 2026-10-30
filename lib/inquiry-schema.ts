import { z } from "zod";

export const divisionOptions = [
  { value: "architecture", label: "Architecture & Engineering" },
  { value: "interiors", label: "Furniture & Interior Design" },
  { value: "printing", label: "Printing & Advertising" },
  { value: "multiple", label: "More than one division" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const contactMethodOptions = [
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
] as const;

export const budgetOptions = [
  "Not sure yet",
  "Under 500,000 ETB",
  "500,000 – 2 million ETB",
  "2 – 10 million ETB",
  "10 – 50 million ETB",
  "Over 50 million ETB",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "Within 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "More than a year",
  "Just exploring",
] as const;

export const UPLOAD_LIMITS = {
  maxFiles: 3,
  maxBytes: 5 * 1024 * 1024,
  types: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
  accept: ".jpg,.jpeg,.png,.webp,.pdf",
} as const;

const trimmed = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);
const optional = (max: number) =>
  trimmed(max)
    .optional()
    .transform((v) => (v && v.length ? v : undefined));

export const inquirySchema = z
  .object({
    name: trimmed(120).min(2, "Please tell us your name."),
    organization: optional(160),
    phone: trimmed(32).regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a valid phone number, e.g. +251 9xx xxx xxx."),
    email: z
      .string()
      .trim()
      .max(200)
      .optional()
      .transform((v) => (v && v.length ? v : undefined))
      .pipe(z.email("Please enter a valid email address.").optional()),
    contactMethod: z.enum(["phone", "whatsapp", "email"], { error: "Choose how we should contact you." }),
    division: z.enum(["architecture", "interiors", "printing", "multiple", "not-sure"], {
      error: "Choose the division or service you need.",
    }),
    location: trimmed(160).min(2, "Where is the project located?"),
    description: trimmed(4000).min(20, "Please describe your project in a few sentences (20+ characters)."),
    budget: z.enum(budgetOptions).optional().or(z.literal("").transform(() => undefined)),
    timeline: z.enum(timelineOptions).optional().or(z.literal("").transform(() => undefined)),
    consent: z.literal("on", { error: "Please confirm we may use these details to respond to you." }),
    /** Honeypot — real visitors never fill this; the API drops such submissions silently. */
    website: z.string().max(500).optional(),
  })
  .superRefine((v, ctx) => {
    if (v.contactMethod === "email" && !v.email) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "Add an email address so we can reply by email." });
    }
  });

/** Fill in missing text fields so validation shows friendly messages instead of type errors. */
export function normaliseRaw(raw: Record<string, string>) {
  const keys = ["name", "phone", "location", "description"];
  const out = { ...raw };
  for (const k of keys) if (out[k] === undefined) out[k] = "";
  return out;
}

export type InquiryInput = z.infer<typeof inquirySchema>;

export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
