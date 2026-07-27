import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyApprovalToken } from "@/lib/approval-token";

function htmlResponse(message: string, status: number) {
  return new NextResponse(
    `<!doctype html><html><body style="font-family: sans-serif; padding: 2rem;"><p>${message}</p></body></html>`,
    { status, headers: { "Content-Type": "text/html" } }
  );
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return htmlResponse("Missing token.", 400);
  }

  const verified = verifyApprovalToken(token);
  if (!verified) {
    return htmlResponse("This link is invalid or has expired.", 400);
  }

  const { userId, action } = verified;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return htmlResponse("This user no longer exists.", 404);
  }

  const approvalStatus = action === "approve" ? "APPROVED" : "REJECTED";
  await prisma.user.update({
    where: { id: userId },
    data: { approvalStatus },
  });

  return htmlResponse(
    action === "approve"
      ? `Approved ${user.name} (${user.email}). They can now log in.`
      : `Rejected ${user.name} (${user.email}).`,
    200
  );
}
