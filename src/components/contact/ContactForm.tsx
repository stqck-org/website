import HCaptcha from "@hcaptcha/react-hcaptcha"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { services } from "../../data/services"
import { useTranslation } from "../../i18n/useTranslation"
import { HCAPTCHA_SITEKEY, sendContact } from "../../lib/contact"
import {
  validateContactForm,
  type ContactFormErrors,
} from "../../lib/validateContactForm"
import { Button, Input, Select, Textarea } from "../ui"

type FormStatus = "idle" | "sending" | "success" | "error"

export function ContactForm() {
  const { locale, tx, localize } = useTranslation()
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<FormStatus>("idle")
  const [captchaToken, setCaptchaToken] = useState("")
  const [captchaError, setCaptchaError] = useState("")
  const [captchaReady, setCaptchaReady] = useState(false)
  const captchaRef = useRef<HCaptcha>(null)
  const captchaWidgetRef = useRef<HTMLDivElement>(null)
  const serviceOptions = services.map((service) => ({
    value: service.slug,
    label: service.title,
  }))

  // The widget is re-rendered in the new language, which invalidates any
  // token already solved.
  useEffect(() => {
    setCaptchaToken("")
  }, [locale])

  // The contact section is the last one on the page, so hCaptcha's third-party
  // script does not need to load at first paint. Render it once the widget is
  // close to the viewport. The empty container reserves the space either way,
  // and this keeps the server and first client render identical.
  useEffect(() => {
    const widget = captchaWidgetRef.current
    if (!widget) return

    if (!("IntersectionObserver" in window)) {
      setCaptchaReady(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setCaptchaReady(true)
        observer.disconnect()
      },
      { rootMargin: "200px 0px" },
    )

    observer.observe(widget)
    return () => observer.disconnect()
  }, [])

  function resetCaptcha() {
    captchaRef.current?.resetCaptcha()
    setCaptchaToken("")
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const values = Object.fromEntries(data.entries()) as Record<string, string>

    // Honeypot: real visitors never see or check this field.
    if (values.botcheck) return

    const nextErrors = validateContactForm(values, tx)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    if (!captchaToken) {
      setCaptchaError(
        tx(
          "Please complete the captcha before sending.",
          "Veuillez valider le captcha avant d’envoyer.",
        ),
      )
      return
    }

    const service = services.find((item) => item.slug === values.service)
    const serviceLabel = service
      ? localize(service.title)
      : tx("Other / Not sure yet", "Autre / Pas encore sûr")
    const subject = tx(
      `Project inquiry from ${values.name}`,
      `Demande de projet de ${values.name}`,
    )

    setStatus("sending")
    setCaptchaError("")

    const result = await sendContact({
      name: values.name,
      email: values.email,
      company: values.company || "",
      service: serviceLabel,
      message: values.message,
      subject,
      captchaToken,
      botcheck: values.botcheck || "",
    })

    // hCaptcha tokens are single-use, so a retry needs a fresh challenge.
    resetCaptcha()

    if (result.ok) {
      form.reset()
      setErrors({})
      setStatus("success")
      return
    }

    setStatus("error")
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      onInput={() => {
        if (status === "success" || status === "error") setStatus("idle")
      }}
      noValidate
    >
      <input
        className="contact-honeypot"
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="field field--half">
        <label htmlFor="name">{tx("Name", "Nom")} *</label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <span className="field-error" id="name-error">
            {errors.name}
          </span>
        )}
      </div>
      <div className="field field--half">
        <label htmlFor="email">Email *</label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <span className="field-error" id="email-error">
            {errors.email}
          </span>
        )}
      </div>
      <div className="field field--half">
        <label htmlFor="company">
          {tx("Company", "Entreprise")}{" "}
          <small>({tx("optional", "facultatif")})</small>
        </label>
        <Input id="company" name="company" autoComplete="organization" />
      </div>
      <div className="field field--half">
        <label htmlFor="service">
          {tx("Service you're interested in", "Service qui vous intéresse")} *
        </label>
        <Select
          id="service"
          name="service"
          defaultValue=""
          aria-invalid={!!errors.service}
        >
          <option value="" disabled>
            {tx("Choose one", "Choisissez une option")}
          </option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label.en === "E-commerce"
                ? "E-commerce"
                : tx(option.label.en, option.label.fr)}
            </option>
          ))}
          <option value="other">
            {tx("Other / Not sure yet", "Autre / Pas encore sûr")}
          </option>
        </Select>
        {errors.service && (
          <span className="field-error">{errors.service}</span>
        )}
      </div>
      <div className="field">
        <label htmlFor="message">
          {tx(
            "What are you looking to solve?",
            "Que souhaitez-vous résoudre ?",
          )}{" "}
          *
        </label>
        <Textarea
          id="message"
          name="message"
          rows={7}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <span className="field-error">{errors.message}</span>
        )}
      </div>
      <div
        className="field captcha-field"
        role="group"
        aria-labelledby="captcha-label"
        aria-describedby={captchaError ? "captcha-error" : undefined}
      >
        <span className="eyebrow" id="captcha-label">
          {tx("Verification", "Vérification")}
        </span>
        <div className="captcha-field__widget" ref={captchaWidgetRef}>
          {captchaReady && (
            <HCaptcha
              ref={captchaRef}
              sitekey={HCAPTCHA_SITEKEY}
              reCaptchaCompat={false}
              languageOverride={locale}
              theme="light"
              onVerify={(token) => {
                setCaptchaToken(token)
                setCaptchaError("")
              }}
              onExpire={() => setCaptchaToken("")}
              onError={() =>
                setCaptchaError(
                  tx(
                    "The captcha failed to load. Please reload the page.",
                    "Le captcha n’a pas pu se charger. Rechargez la page.",
                  ),
                )
              }
            />
          )}
        </div>
        {captchaError && (
          <span className="field-error" id="captcha-error" role="alert">
            {captchaError}
          </span>
        )}
        <p className="captcha-field__note">
          {tx("Protected by hCaptcha", "Protégé par hCaptcha")} ·{" "}
          <a
            href="https://www.hcaptcha.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            {tx("Privacy", "Confidentialité")}
          </a>{" "}
          ·{" "}
          <a
            href="https://www.hcaptcha.com/terms"
            target="_blank"
            rel="noreferrer"
          >
            {tx("Terms", "Conditions")}
          </a>
        </p>
      </div>
      <div className="form-submit">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending"
            ? tx("Sending…", "Envoi…")
            : tx("Send inquiry", "Envoyer la demande")}{" "}
          <span aria-hidden="true">→</span>
        </Button>
        <p>
          {tx(
            "We only use your details to reply to your inquiry.",
            "Vos informations servent uniquement à répondre à votre demande.",
          )}
        </p>
      </div>
      {status === "success" && (
        <div className="form-status form-status--success" role="status">
          <strong>
            {tx(
              "Thanks — your message is on its way.",
              "Merci — votre message est en route.",
            )}
          </strong>
          <p>
            {tx(
              "We'll get back to you within two business days.",
              "Nous vous répondrons sous deux jours ouvrés.",
            )}
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="form-status form-status--error" role="alert">
          <strong>
            {tx(
              "Your message couldn't be sent.",
              "Votre message n’a pas pu être envoyé.",
            )}
          </strong>
          <p>
            {tx(
              "Please try again in a moment. Your entries are still here.",
              "Réessayez dans un instant. Les informations saisies sont toujours là.",
            )}
          </p>
        </div>
      )}
    </form>
  )
}
