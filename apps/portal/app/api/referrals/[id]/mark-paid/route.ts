import { NextResponse } from "next/server";
import { markReferralPaid } from "@forma/db";
import { requireAdmin } from "@/lib/auth";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await context.params;
  const body = await request.json();
  const payoutReference = String(body.payoutReference || "").trim();

  if (!payoutReference) {
    return NextResponse.json(
      { error: "Payout reference is required" },
      { status: 400 }
    );
  }

  const result = await markReferralPaid(id, payoutReference);
  if (!result) {
    return NextResponse.json(
      { error: "Reward not found or not in payable state" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
