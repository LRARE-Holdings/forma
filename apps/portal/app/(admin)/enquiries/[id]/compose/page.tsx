import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerClient } from "@forma/db";
import ComposeEmailForm from "@/components/admin/ComposeEmailForm";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";

export const dynamic = "force-dynamic";

export default async function ComposePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerClient();
  const { data: s } = await supabase
    .from("onboarding_submissions")
    .select("id, studio_name, owner_name, owner_email")
    .eq("id", id)
    .maybeSingle();

  if (!s) notFound();
  if (!s.owner_email) {
    return (
      <div className="max-w-[640px]">
        <p className="text-[0.84rem] text-amber">
          This enquiry has no owner email — can&apos;t compose a message.
        </p>
        <Link href={`/enquiries/${id}`} className="text-terracotta text-[0.82rem]">
          ← Back
        </Link>
      </div>
    );
  }

  const firstName = (s.owner_name || "").split(" ")[0] || "there";
  const tokens = {
    studio_name: s.studio_name,
    owner_first_name: firstName,
    owner_full_name: s.owner_name || "",
  };

  return (
    <div className="max-w-[760px]">
      <Link
        href={`/enquiries/${id}`}
        className="text-[0.78rem] text-driftwood hover:text-espresso"
      >
        ← Back to enquiry
      </Link>
      <h1
        className="text-[2rem] text-espresso mt-3 mb-1"
        style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
      >
        Email {s.owner_name || s.owner_email}
      </h1>
      <p className="text-[0.84rem] text-driftwood mb-6">
        Sent from <span className="font-mono">hello@useforma.co.uk</span> to{" "}
        <span className="font-mono">{s.owner_email}</span>. Logged on the
        enquiry timeline.
      </p>

      <ComposeEmailForm
        submissionId={id}
        templates={EMAIL_TEMPLATES}
        tokens={tokens}
      />
    </div>
  );
}
