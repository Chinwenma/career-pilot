export async function sendSignupApprovalRequest({
  name,
  email,
  approveUrl,
  rejectUrl,
}: {
  name: string;
  email: string;
  approveUrl: string;
  rejectUrl: string;
}): Promise<void> {
  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) {
    console.error(
      "FORMSPREE_ENDPOINT is not set; skipping signup approval notification."
    );
    return;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        subject: `Career Pilot: approve signup for ${email}`,
        name,
        email,
        message: `New signup awaiting approval:\n\nName: ${name}\nEmail: ${email}\n\nApprove: ${approveUrl}\n\nReject: ${rejectUrl}`,
      }),
    });

    if (!response.ok) {
      console.error(
        "Formspree notification failed:",
        response.status,
        await response.text()
      );
    }
  } catch (error) {
    console.error("Formspree notification failed:", error);
  }
}
