"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { checkPassword, clientIp, createSession, destroySession, isAdmin, rateLimit } from "@/lib/server/security";
import { STATUSES, updateInquiry } from "@/lib/server/inquiries";

export async function login(_: { error?: string } | undefined, form: FormData) {
  const ip = await clientIp();
  if (!rateLimit(`login:${ip}`, 8, 15 * 60 * 1000)) {
    return { error: "Too many attempts. Please wait 15 minutes." };
  }
  const password = String(form.get("password") ?? "");
  if (!checkPassword(password)) {
    return { error: "Incorrect password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(STATUSES).optional(),
  assignee: z.string().trim().max(80).optional(),
  note: z.string().trim().max(2000).optional(),
});

export async function updateLead(form: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const parsed = updateSchema.safeParse({
    id: form.get("id"),
    status: form.get("status") || undefined,
    assignee: form.has("assignee") ? String(form.get("assignee")) : undefined,
    note: form.get("note") || undefined,
  });
  if (!parsed.success) return;
  await updateInquiry(parsed.data.id, parsed.data);
  revalidatePath(`/admin/inquiries/${parsed.data.id}`);
  revalidatePath("/admin");
}
