import { Resend } from "resend"

let resendClient

export function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("missing_resend_api_key")
  }

  resendClient ??= new Resend(process.env.RESEND_API_KEY)

  return resendClient
}
