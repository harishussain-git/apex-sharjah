import { getResendClient } from "./resend"

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")

const formatHtmlValue = (value) => escapeHtml(value).replaceAll("\n", "<br />")

const recipientEnvironmentVariables = {
  "contact-dialog": "CONTACT_FORM_TO",
  "contact-page": "CONTACT_FORM_TO",
  admission: "ADMISSION_FORM_TO",
}

const getEmailConfiguration = (formType) => {
  const recipientEnvironmentVariable = recipientEnvironmentVariables[formType]
  const from = process.env.RESEND_FROM_EMAIL?.trim()
  const to = process.env[recipientEnvironmentVariable]?.split(",")
    .map((email) => email.trim())
    .filter(Boolean)

  if (!recipientEnvironmentVariable || !from || !to?.length) {
    throw new Error("missing_form_email_configuration")
  }

  return { from, to }
}

const buildEmailContent = (definition, values) => {
  const rows = Object.entries(definition.fields)
    .filter(([fieldName]) => values[fieldName])
    .map(([fieldName, field]) => ({ label: field.label, value: values[fieldName] }))

  const htmlRows = rows
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #475569; font-weight: 700; vertical-align: top; width: 190px;">
            ${escapeHtml(label)}
          </td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a; vertical-align: top;">
            ${formatHtmlValue(value)}
          </td>
        </tr>`,
    )
    .join("")

  const html = `
    <!doctype html>
    <html lang="en">
      <body style="margin: 0; background: #f8fafc; font-family: Arial, sans-serif;">
        <div style="max-width: 680px; margin: 0 auto; padding: 32px 16px;">
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 18px; overflow: hidden;">
            <div style="background: #25218d; padding: 24px; color: #ffffff;">
              <h1 style="margin: 0; font-size: 22px;">${escapeHtml(definition.title)}</h1>
              <p style="margin: 8px 0 0; color: #e0e7ff;">Apex Vision Model School website</p>
            </div>
            <table role="presentation" style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tbody>${htmlRows}</tbody>
            </table>
          </div>
        </div>
      </body>
    </html>`

  const text = [
    definition.title,
    "Apex Vision Model School website",
    "",
    ...rows.map(({ label, value }) => `${label}: ${value}`),
  ].join("\n")

  return { html, text }
}

export async function sendFormEmail(formType, definition, values) {
  const resend = getResendClient()
  const { from, to } = getEmailConfiguration(formType)
  const { html, text } = buildEmailContent(definition, values)

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: definition.subject,
    html,
    text,
    ...(values.email ? { replyTo: values.email } : {}),
  })

  if (error) {
    throw new Error(error.message || error.name || "resend_delivery_failed")
  }

  if (!data?.id) throw new Error("resend_missing_email_id")

  return data.id
}
