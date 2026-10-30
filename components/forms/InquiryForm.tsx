"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { ArrowRight, Check, FileText, Loader2, Paperclip, X } from "lucide-react";
import {
  budgetOptions,
  contactMethodOptions,
  divisionOptions,
  fieldErrors,
  inquirySchema,
  normaliseRaw,
  timelineOptions,
  UPLOAD_LIMITS,
} from "@/lib/inquiry-schema";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/ui/Button";

type Errors = Record<string, string>;
type DivisionValue = (typeof divisionOptions)[number]["value"];

const inputCls =
  "peer w-full border-0 border-b border-obsidian/25 bg-transparent px-0 py-3 text-base text-obsidian placeholder:text-obsidian/35 transition-colors focus:border-obsidian focus:outline-none focus:ring-0 aria-[invalid=true]:border-arch";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-[0.14em] text-obsidian/70">
        {label}
        {optional && <span className="font-normal normal-case tracking-normal text-obsidian/40">Optional</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-2 text-xs text-obsidian/50">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-xs font-medium text-arch" role="alert">
          <X className="h-3.5 w-3.5" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

function ChipGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  legend: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-obsidian/70">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span className="inline-flex min-h-11 items-center gap-2 border border-obsidian/20 px-4 py-2 text-sm transition-colors hover:border-obsidian/60 peer-checked:border-obsidian peer-checked:bg-obsidian peer-checked:text-bone peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne">
              {value === o.value && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 flex items-center gap-1.5 text-xs font-medium text-arch" role="alert">
          <X className="h-3.5 w-3.5" aria-hidden="true" /> {error}
        </p>
      )}
    </fieldset>
  );
}

export function InquiryForm({ defaultDivision, compact = false }: { defaultDivision?: DivisionValue; compact?: boolean }) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [ref, setRef] = useState<string | null>(null);
  const [contactMethod, setContactMethod] = useState("phone");
  const [division, setDivision] = useState<string>(defaultDivision ?? "");
  const [files, setFiles] = useState<File[]>([]);

  const describe = (k: string, hint?: boolean) =>
    errors[k] ? `${id(k)}-error` : hint ? `${id(k)}-hint` : undefined;

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    let err: string | undefined;
    for (const f of Array.from(list)) {
      if (!(UPLOAD_LIMITS.types as readonly string[]).includes(f.type)) err = `"${f.name}" is not a JPG, PNG, WebP or PDF file.`;
      else if (f.size > UPLOAD_LIMITS.maxBytes) err = `"${f.name}" is larger than 5 MB.`;
      else if (next.length >= UPLOAD_LIMITS.maxFiles) err = `You can attach up to ${UPLOAD_LIMITS.maxFiles} files.`;
      else next.push(f);
    }
    setFiles(next);
    setErrors((e) => {
      const { files: _f, ...rest } = e;
      return err ? { ...rest, files: err } : rest;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    fd.delete("files");
    files.forEach((f) => fd.append("files", f));

    const raw: Record<string, string> = {};
    fd.forEach((v, k) => typeof v === "string" && (raw[k] = v));
    const parsed = inquirySchema.safeParse(normaliseRaw(raw));
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      setFormError("Please check the highlighted fields.");
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setState("sending");
    try {
      const res = await fetch("/api/inquiries", { method: "POST", body: fd });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; ref?: string; error?: string; fields?: Errors };
      if (!res.ok || !json.ok) {
        setErrors(json.fields ?? {});
        setFormError(json.error ?? "We could not send your inquiry. Please try again.");
        setState("idle");
        return;
      }
      setRef(json.ref ?? null);
      setState("done");
      formRef.current?.reset();
      setFiles([]);
    } catch {
      setFormError("Network problem — please check your connection and try again.");
      setState("idle");
    }
  }

  return (
    <div className="relative">
        {state === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="border border-obsidian/15 bg-bone p-8 sm:p-12"
            role="status"
            aria-live="polite"
          >
            <span className="grid h-12 w-12 place-items-center bg-obsidian text-bone" aria-hidden="true">
              <Check className="h-6 w-6" />
            </span>
            <h3 className="display-md mt-8">Thank you — your inquiry has been received.</h3>
            <p className="mt-5 max-w-lg leading-relaxed text-obsidian/70">
              A member of the Fidelity team will review your project details and contact you using your preferred method.
            </p>
            {ref && (
              <p className="mt-6 text-sm text-obsidian/60">
                Your reference: <strong className="font-mono text-obsidian">{ref}</strong>
              </p>
            )}
            <div className="mt-10 flex flex-wrap gap-3">
              <button type="button" onClick={() => setState("idle")} className={buttonClass("outline-dark")}>
                Send another inquiry
              </button>
              <Link href="/projects" className={buttonClass("dark")}>
                Explore our work <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            className="space-y-14"
            aria-describedby={formError ? id("form-error") : undefined}
          >
            {formError && (
              <p id={id("form-error")} role="alert" className="border-l-2 border-arch bg-arch/5 px-4 py-3 text-sm text-obsidian">
                {formError}
              </p>
            )}

            {/* 01 */}
            <section aria-labelledby={id("s1")} className="space-y-8">
              <h3 id={id("s1")} className="flex items-baseline gap-4 font-display text-lg font-semibold uppercase tracking-tight">
                <span className="text-sm text-obsidian/40">01</span> About you
              </h3>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field id={id("name")} label="Full name" error={errors.name}>
                  <input id={id("name")} name="name" autoComplete="name" required className={inputCls} aria-invalid={!!errors.name} aria-describedby={describe("name")} />
                </Field>
                <Field id={id("organization")} label="Company / organisation" optional error={errors.organization}>
                  <input id={id("organization")} name="organization" autoComplete="organization" className={inputCls} aria-invalid={!!errors.organization} aria-describedby={describe("organization")} />
                </Field>
                <Field id={id("phone")} label="Phone number" error={errors.phone}>
                  <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+251 9xx xxx xxx" className={inputCls} aria-invalid={!!errors.phone} aria-describedby={describe("phone")} />
                </Field>
                <Field id={id("email")} label="Email address" optional={contactMethod !== "email"} error={errors.email}>
                  <input id={id("email")} name="email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} aria-describedby={describe("email")} />
                </Field>
              </div>
              <ChipGroup name="contactMethod" legend="Preferred contact method" options={contactMethodOptions} value={contactMethod} onChange={setContactMethod} error={errors.contactMethod} />
            </section>

            {/* 02 */}
            <section aria-labelledby={id("s2")} className="space-y-8">
              <h3 id={id("s2")} className="flex items-baseline gap-4 font-display text-lg font-semibold uppercase tracking-tight">
                <span className="text-sm text-obsidian/40">02</span> Your project
              </h3>
              <ChipGroup name="division" legend="What do you need?" options={divisionOptions} value={division} onChange={setDivision} error={errors.division} />
              <Field id={id("location")} label="Project location" error={errors.location}>
                <input id={id("location")} name="location" placeholder="e.g. Wolaita Sodo" className={inputCls} aria-invalid={!!errors.location} aria-describedby={describe("location")} />
              </Field>
              <Field id={id("description")} label="Tell us about the project" error={errors.description} hint="What you want to build, design or produce, and anything we should know.">
                <textarea id={id("description")} name="description" rows={compact ? 4 : 5} className={cn(inputCls, "resize-y")} aria-invalid={!!errors.description} aria-describedby={describe("description", true)} />
              </Field>
            </section>

            {/* 03 */}
            <section aria-labelledby={id("s3")} className="space-y-8">
              <h3 id={id("s3")} className="flex items-baseline gap-4 font-display text-lg font-semibold uppercase tracking-tight">
                <span className="text-sm text-obsidian/40">03</span> Helpful details <span className="text-xs font-normal normal-case tracking-normal text-obsidian/40">Optional</span>
              </h3>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field id={id("budget")} label="Estimated budget" optional>
                  <select id={id("budget")} name="budget" defaultValue="" className={cn(inputCls, "cursor-pointer")}>
                    <option value="">Select a range</option>
                    {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Field>
                <Field id={id("timeline")} label="Expected timeline" optional>
                  <select id={id("timeline")} name="timeline" defaultValue="" className={cn(inputCls, "cursor-pointer")}>
                    <option value="">Select a timeline</option>
                    {timelineOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-obsidian/70" id={id("files-label")}>
                  Plans, sketches or reference images <span className="font-normal normal-case tracking-normal text-obsidian/40">· Optional</span>
                </p>
                <label
                  htmlFor={id("files")}
                  className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-obsidian/25 px-6 py-8 text-center text-sm text-obsidian/60 transition-colors hover:border-obsidian/60 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-champagne"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
                >
                  <Paperclip className="h-5 w-5" aria-hidden="true" />
                  <span><span className="font-medium text-obsidian underline underline-offset-4">Choose files</span> or drag them here</span>
                  <span className="text-xs text-obsidian/45">JPG, PNG, WebP or PDF · up to {UPLOAD_LIMITS.maxFiles} files · 5 MB each</span>
                  <input
                    id={id("files")}
                    type="file"
                    multiple
                    accept={UPLOAD_LIMITS.accept}
                    className="sr-only"
                    aria-describedby={errors.files ? `${id("files")}-error` : undefined}
                    onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
                  />
                </label>
                {errors.files && (
                  <p id={`${id("files")}-error`} className="mt-2 text-xs font-medium text-arch" role="alert">{errors.files}</p>
                )}
                {files.length > 0 && (
                  <ul className="mt-4 divide-y divide-obsidian/10 border-y border-obsidian/10" aria-label="Attached files">
                    {files.map((f, i) => (
                      <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-4 py-3 text-sm">
                        <span className="flex min-w-0 items-center gap-3">
                          <FileText className="h-4 w-4 shrink-0 text-obsidian/50" aria-hidden="true" />
                          <span className="truncate">{f.name}</span>
                          <span className="shrink-0 text-xs text-obsidian/45">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                        </span>
                        <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="grid h-9 w-9 place-items-center hover:bg-linen" aria-label={`Remove ${f.name}`}>
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {/* honeypot */}
            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label>
                Website <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="space-y-8 border-t border-obsidian/15 pt-8">
              <label className="flex cursor-pointer items-start gap-3 text-sm text-obsidian/70">
                <input
                  type="checkbox"
                  name="consent"
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-obsidian"
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? id("consent-error") : undefined}
                />
                <span>
                  I agree that Fidelity Business Group may use these details to respond to my inquiry, as described in the{" "}
                  <Link href="/privacy" className="underline underline-offset-4 hover:text-obsidian">privacy policy</Link>.
                </span>
              </label>
              {errors.consent && <p id={id("consent-error")} className="-mt-5 text-xs font-medium text-arch" role="alert">{errors.consent}</p>}

              <button type="submit" disabled={state === "sending"} className={buttonClass("dark", "lg", "w-full sm:w-auto")} aria-busy={state === "sending"}>
                <span>{state === "sending" ? "Sending your inquiry…" : "Send project inquiry"}</span>
                {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
          </form>
        )}
    </div>
  );
}
