import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY || "re_123");
export default resend;
