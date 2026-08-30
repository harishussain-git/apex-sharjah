"use client"

import { useCallback, useState } from "react"

const initialState = {
  status: "idle",
  message: "",
  fieldErrors: {},
}

export default function useFormSubmission() {
  const [state, setState] = useState(initialState)

  const resetStatus = useCallback(() => {
    setState(initialState)
  }, [])

  const submit = useCallback(async (formType, form) => {
    const formData = new FormData(form)
    const honeypot = String(formData.get("website") ?? "")
    formData.delete("website")

    setState({ status: "submitting", message: "", fieldErrors: {} })

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          honeypot,
          fields: Object.fromEntries(formData.entries()),
        }),
      })
      const result = await response.json()

      setState({
        status: result.success ? "success" : "error",
        message: result.message,
        fieldErrors: result.fieldErrors ?? {},
      })

      return result
    } catch {
      const result = {
        success: false,
        message: "We could not send your message right now. Please try again shortly.",
        fieldErrors: {},
      }

      setState({
        status: "error",
        message: result.message,
        fieldErrors: result.fieldErrors,
      })
      return result
    }
  }, [])

  return {
    ...state,
    isSubmitting: state.status === "submitting",
    isSuccess: state.status === "success",
    resetStatus,
    submit,
  }
}
