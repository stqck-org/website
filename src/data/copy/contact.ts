import contactEn from "../en/contact.json";
import contactFr from "../fr/contact.json";

/** Copy contract for the Contact section. */
export interface ContactCopy {
  sectionLabel: string;
  headingLine1: string;
  headingLine2: string;
  details: {
    newBusiness: string;
    findUs: string;
    follow: string;
    location: string;
  };
  form: {
    name: string;
    email: string;
    projectType: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    options: string[];
    send: string;
    sent: string;
  };
}

const en: ContactCopy = contactEn;
const fr: ContactCopy = contactFr;

export const contactCopy = { en, fr };
