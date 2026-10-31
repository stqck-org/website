import { useState, type FormEvent } from "react"
import { services } from "../../data/services"
import { useTranslation } from "../../i18n/useTranslation"
import { sendContact } from "../../lib/contact"
import {
  validateContactForm,
  type ContactFormErrors,
} from "../../lib/validateContactForm"
import { Button, Input, Select, Textarea } from "../ui"

export function ContactForm() {
  const { tx } = useTranslation()
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<"idle" | "sending" | "unconfigured">(
    "idle",
  )
  const serviceOptions = services.map((service) => ({
    value: service.slug,
    label: service.title,
  }))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values = Object.fromEntries(data.entries()) as Record<string, string>
    const nextErrors = validateContactForm(values, tx)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setStatus("sending")
    const result = await sendContact({
      name: values.name,
      email: values.email,
      company: values.company || "",
      service: values.service,
      message: values.message,
    })
    if (!result.ok) setStatus("unconfigured")
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
          {tx("Service of interest", "Service recherché")} *
        </label>
        <Select
          id="service"
          name="service"
          defaultValue=""
          aria-invalid={!!errors.service}
        >
          <option value="" disabled>
            {tx("Choose one", "Choisissez")}
          </option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label.en === "E-commerce"
                ? "E-commerce"
                : tx(option.label.en, option.label.fr)}
            </option>
          ))}
          <option value="other">
            {tx("Other / Not sure", "Autre / Pas encore sûr")}
          </option>
        </Select>
        {errors.service && (
          <span className="field-error">{errors.service}</span>
        )}
      </div>
      <div className="field">
        <label htmlFor="message">
          {tx(
            "What are you trying to solve?",
            "Que cherchez-vous à résoudre ?",
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
      <div className="form-submit">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending"
            ? tx("Checking…", "Vérification…")
            : tx("Review inquiry", "Vérifier la demande")}{" "}
          <span aria-hidden="true">→</span>
        </Button>
        <p>
          {tx(
            "No message is sent until a delivery provider is configured.",
            "Aucun message n’est envoyé tant qu’un service d’envoi n’est pas configuré.",
          )}
        </p>
      </div>
      {status === "unconfigured" && (
        <div className="form-status" role="status">
          <strong>
            {tx(
              "Your message has not been sent.",
              "Votre message n’a pas été envoyé.",
            )}
          </strong>
          <p>
            {tx(
              "This preview has no contact provider configured yet. Your entries remain in the form so you can copy them safely.",
              "Cette version de démonstration n’a pas encore de service de contact configuré. Vos informations restent dans le formulaire pour pouvoir les copier.",
            )}
          </p>
        </div>
      )}
    </form>
  )
}
