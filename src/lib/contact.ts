type ContactPayload = {
  name: string
  email: string
  company: string
  service: string
  message: string
  subject: string
  captchaToken?: string
  botcheck?: string
}

type Web3FormsResponse = {
  success?: boolean
  message?: string
}

export type ContactResult = { ok: true } | {
  ok: false
  reason: "not_configured" | "network" | "rejected"
}

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

// Public by design: this is the sitekey for Web3Forms' free-plan hCaptcha.
// Override with VITE_HCAPTCHA_SITEKEY if the form uses custom hCaptcha keys.
export const HCAPTCHA_SITEKEY =
  import.meta.env.VITE_HCAPTCHA_SITEKEY ||
  "50b2fe65-b00b-4b9e-ad62-3ba471098be2"

export async function sendContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (!accessKey) {
    console.warn(
      "VITE_WEB3FORMS_ACCESS_KEY is not set. Contact form submissions are disabled.",
    )
    return { ok: false, reason: "not_configured" }
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: payload.subject,
        from_name: "stqck website",
        replyto: payload.email,
        name: payload.name,
        email: payload.email,
        company: payload.company,
        service: payload.service,
        message: payload.message,
        botcheck: payload.botcheck || "",
        "h-captcha-response": payload.captchaToken || "",
      }),
      signal: AbortSignal.timeout(15_000),
    })

    const data = (await response.json().catch(() => ({}))) as Web3FormsResponse

    if (response.ok && data.success) {
      return { ok: true }
    }

    return { ok: false, reason: "rejected" }
  } catch {
    return { ok: false, reason: "network" }
  }
}
