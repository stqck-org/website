export type ContactFormErrors = Partial<Record<"name" | "email" | "service" | "message", string>>

type Translate = (en: string, fr: string) => string

export function validateContactForm(
  values: Record<string, string>,
  tx: Translate,
): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!values.name?.trim()) {
    errors.name = tx("Tell us your name.", "Indiquez votre nom.")
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email || "")) {
    errors.email = tx("Enter a valid email.", "Saisissez un e-mail valide.")
  }
  if (!values.service) {
    errors.service = tx("Choose a service.", "Choisissez un service.")
  }
  if (!values.message?.trim()) {
    errors.message = tx(
      "Tell us a little about the project.",
      "Parlez-nous un peu du projet.",
    )
  }

  return errors
}
