import { FORM_DEFINITIONS } from "./formDefinitions"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const controlCharacters = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g

const normalizeSingleLine = (value) =>
  value.replace(controlCharacters, "").replace(/\s+/g, " ").trim()

const normalizeMultiline = (value) =>
  value
    .replace(/\r\n?/g, "\n")
    .replace(controlCharacters, "")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim()

const normalizePhone = (value) => {
  const compactPhone = value.replace(/[\s()-]/g, "")

  if (/^05\d{8}$/.test(compactPhone)) {
    return `+971${compactPhone.slice(1)}`
  }

  if (/^5\d{8}$/.test(compactPhone)) {
    return `+971${compactPhone}`
  }

  if (/^(?:\+971|971)5\d{8}$/.test(compactPhone)) {
    return compactPhone.startsWith("+") ? compactPhone : `+${compactPhone}`
  }

  return null
}

const isValidDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const date = new Date(`${value}T00:00:00.000Z`)

  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(`${dateOfBirth}T00:00:00`)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1
  }

  return String(age)
}

export function validateFormSubmission(formType, submittedFields) {
  const definition = FORM_DEFINITIONS[formType]

  if (!definition || !submittedFields || typeof submittedFields !== "object") {
    return {
      success: false,
      message: "This form submission is invalid.",
      fieldErrors: {},
    }
  }

  const values = {}
  const fieldErrors = {}

  for (const [fieldName, field] of Object.entries(definition.fields)) {
    if (field.type === "computed") continue

    const submittedValue = submittedFields[fieldName]

    if (submittedValue != null && typeof submittedValue !== "string") {
      fieldErrors[fieldName] = "Enter a valid value."
      continue
    }

    const rawValue = submittedValue ?? ""
    const value =
      field.type === "multiline"
        ? normalizeMultiline(rawValue)
        : normalizeSingleLine(rawValue)

    if (!value) {
      if (field.required) fieldErrors[fieldName] = "Required"
      values[fieldName] = ""
      continue
    }

    if (value.length > field.maxLength) {
      fieldErrors[fieldName] = `Use ${field.maxLength} characters or fewer.`
      continue
    }

    if (field.type === "email" && !emailPattern.test(value)) {
      fieldErrors[fieldName] = "Enter a valid email address."
      continue
    }

    if (field.type === "phone") {
      const phone = normalizePhone(value)

      if (!phone) {
        fieldErrors[fieldName] = "Enter a valid UAE mobile number."
        continue
      }

      values[fieldName] = phone
      continue
    }

    if (field.type === "select" && !field.options.includes(value)) {
      fieldErrors[fieldName] = "Select a valid option."
      continue
    }

    if (field.type === "date") {
      if (!isValidDate(value) || new Date(`${value}T00:00:00`) > new Date()) {
        fieldErrors[fieldName] = "Enter a valid date of birth."
        continue
      }
    }

    values[fieldName] = value
  }

  if (Object.keys(fieldErrors).length) {
    return {
      success: false,
      message: "Please review the highlighted fields.",
      fieldErrors,
    }
  }

  if (formType === "admission") {
    values.age = calculateAge(values.dob)
  }

  return { success: true, definition, values, fieldErrors: {} }
}
