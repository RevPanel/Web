import { ReactNode } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY || "re_123");
export default resend;

export async function sendEmail(
  to: string,
  subject: string,
  content: ReactNode
) {
  return resend.emails.send({
    from: "RevPanel <noreply@revpanel.io>",
    to,
    subject: subject,
    react: content,
  });
}
