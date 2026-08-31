"use client"

import { useCallback, useState } from "react"

const initialState = {
  status: "idle",
  message: "",
  fieldErrors: {},
}

const submissionError = {
  success: false,
  message: "We could not send your message right now. Please try again shortly.",
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

      if (!response.ok || result?.success !== true) {
        const errorResult = {
          success: false,
          message: result?.message || submissionError.message,
          fieldErrors: result?.fieldErrors ?? {},
        }

        setState({
          status: "error",
          message: errorResult.message,
          fieldErrors: errorResult.fieldErrors,
        })

        return errorResult
      }

      setState({
        status: "success",
        message: result.message,
        fieldErrors: result.fieldErrors ?? {},
      })

      return result
    } catch (error) {
      console.error("[forms] Submission failed.", error)

      setState({
        status: "error",
        message: submissionError.message,
        fieldErrors: submissionError.fieldErrors,
      })
      return submissionError
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
