import { useState, type FormEvent, type ReactNode } from "react";

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
            <span>Start a project</span>
          </div>
          <Heading as="h2">
            Have a good problem?
            <br />
            Let’s talk.
          </Heading>
          <div className="contact-details">
            <DetailRow label="New business">
              <Link href="mailto:hello@nordicloop.studio">
                hello@nordicloop.studio
              </Link>
            </DetailRow>
            <DetailRow label="Find us">
              <p>Lisbon · Copenhagen · Everywhere</p>
            </DetailRow>
            <DetailRow label="Follow">
              <p>
                <Link href="#instagram">Instagram</Link> ·{" "}
                <Link href="#linkedin">LinkedIn</Link>
              </p>
            </DetailRow>
          </div>
        </div>
        <form className="contact-form reveal" onSubmit={submitForm}>
          <label>
            <span>01 / Name</span>
            <Field name="name" placeholder="Your name" required />
          </label>
          <label>
            <span>02 / Email</span>
            <Field
              name="email"
              placeholder="you@company.com"
              required
              type="email"
            />
          </label>
          <label>
            <span>03 / Project type</span>
            <Field as="select" name="projectType">
              <option>New digital product</option>
              <option>Website or platform</option>
              <option>Brand identity</option>
              <option>Ongoing product team</option>
            </Field>
          </label>
          <label>
            <span>04 / Tell us a little more</span>
            <Field
              as="textarea"
              name="message"
              placeholder="The short version is..."
              required
              rows={3}
            />
          </label>
          <Button className="angle-button angle-primary submit-button" type="submit">
            {submitted ? "Message received" : "Send message"} <Arrow />
          </Button>
        </form>
      </div>
    </section>
  );
}
