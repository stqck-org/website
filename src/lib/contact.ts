type ContactPayload = {
  name: string
  email: string
  company: string
  service: string
  message: string
}

export async function sendContact(_payload: ContactPayload) {
  await new Promise((resolve) => window.setTimeout(resolve, 450))
  return {
    ok: false as const,
    reason: "not_configured" as const,
  }
}
