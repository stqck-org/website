import { useState, type FormEvent, type ReactNode } from "react";

import { useCopy } from "../../i18n/useCopy";
import { Arrow } from "../ui/Arrow";
import { Button } from "../ui/Button";
import { Field } from "../ui/Field";
import { Heading } from "../ui/Heading";
import { Link } from "../ui/Link";

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <span className="detail-label">{label}</span>
      {children}
    </div>
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const copy = useCopy("contact");

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="contact" id="contact">
      <div className="shell contact-grid">
        <div className="contact-copy reveal">
          <div className="section-label label-dark">
            <span>04</span>
            <span>{copy.sectionLabel}</span>
          </div>
          <Heading as="h2">
            {copy.headingLine1}
            <br />
            {copy.headingLine2}
          </Heading>
          <div className="contact-details">
            <DetailRow label={copy.details.newBusiness}>
              <Link href="mailto:hello@nordicloop.studio">
                hello@nordicloop.studio
              </Link>
            </DetailRow>
            <DetailRow label={copy.details.findUs}>
              <p>{copy.details.location}</p>
            </DetailRow>
            <DetailRow label={copy.details.follow}>
              <p>
                <Link href="#instagram">Instagram</Link> ·{" "}
                <Link href="#linkedin">LinkedIn</Link>
              </p>
            </DetailRow>
          </div>
        </div>
        <form className="contact-form reveal" onSubmit={submitForm}>
          <label>
            <span>{copy.form.name}</span>
            <Field name="name" placeholder={copy.form.namePlaceholder} required />
          </label>
          <label>
            <span>{copy.form.email}</span>
            <Field
              name="email"
              placeholder={copy.form.emailPlaceholder}
              required
              type="email"
            />
          </label>
          <label>
            <span>{copy.form.projectType}</span>
            <Field as="select" name="projectType">
              {copy.form.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Field>
          </label>
          <label>
            <span>{copy.form.message}</span>
            <Field
              as="textarea"
              name="message"
              placeholder={copy.form.messagePlaceholder}
              required
              rows={3}
            />
          </label>
          <Button className="angle-button angle-primary submit-button" type="submit">
            {submitted ? copy.form.sent : copy.form.send} <Arrow />
          </Button>
        </form>
      </div>
    </section>
  );
}
