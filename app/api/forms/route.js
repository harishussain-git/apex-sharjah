import { sendFormEmail } from "@/lib/forms/server/sendFormEmail"
import { validateFormSubmission } from "@/lib/forms/validateFormSubmission"

const maximumBodyLength = 16_000
const responseHeaders = { "Cache-Control": "no-store" }
const successResponse = {
  success: true,
  message: "Thank you. Our team will contact you shortly.",
  fieldErrors: {},
}

const jsonResponse = (body, status = 200) =>
  Response.json(body, { status, headers: responseHeaders })

const hasValidOrigin = (request) => {
  const origin = request.headers.get("origin")
  const requestHost = (
    request.headers.get("x-forwarded-host") ?? request.headers.get("host")
  )
    ?.split(",")[0]
    .trim()

  if (!origin || !requestHost) return false

  try {
    return new URL(origin).host === requestHost
  } catch {
    return false
  }
}

export async function POST(request) {
  if (!hasValidOrigin(request)) {
    return jsonResponse(
      { success: false, message: "Invalid request.", fieldErrors: {} },
      403,
    )
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonResponse(
      { success: false, message: "Invalid request.", fieldErrors: {} },
      415,
    )
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0)

  if (contentLength > maximumBodyLength) {
    return jsonResponse(
      { success: false, message: "Form submission is too large.", fieldErrors: {} },
      413,
    )
  }

  let payload

  try {
    const rawBody = await request.text()

    if (rawBody.length > maximumBodyLength) {
      return jsonResponse(
        { success: false, message: "Form submission is too large.", fieldErrors: {} },
        413,
      )
    }

    payload = JSON.parse(rawBody)
  } catch {
    return jsonResponse(
      { success: false, message: "Invalid request.", fieldErrors: {} },
      400,
    )
  }

  const honeypot = payload?.honeypot

  if (
    honeypot != null &&
    (typeof honeypot !== "string" || honeypot.trim())
  ) {
    return jsonResponse(
      {
        success: false,
        message: "We could not send your message right now. Please try again shortly.",
        fieldErrors: {},
      },
      400,
    )
  }

  const validation = validateFormSubmission(payload?.formType, payload?.fields)

  if (!validation.success) return jsonResponse(validation, 400)

  try {
    await sendFormEmail(payload.formType, validation.definition, validation.values)
    return jsonResponse(successResponse)
  } catch (error) {
    console.error("[forms] Email delivery failed.", {
      reason: error instanceof Error ? error.message : "unknown_error",
    })

    return jsonResponse(
      {
        success: false,
        message: "We could not send your message right now. Please try again shortly.",
        fieldErrors: {},
      },
      502,
    )
  }
}
