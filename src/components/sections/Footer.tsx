import { footerColumns, type FooterLinkId } from "../../data/site";
import { useCopy } from "../../i18n/useCopy";
import { Arrow } from "../ui/Arrow";
import { Button } from "../ui/Button";
import { Field } from "../ui/Field";
import { Link } from "../ui/Link";

function FooterLinkColumn({
  label,
  links,
}: {
  label: string;
  links: readonly { id: FooterLinkId; href: string }[];
}) {
  const copy = useCopy("footer");

  return (
    <div className="footer-links">
      <span className="detail-label">{label}</span>
      {links.map((link) => (
        <Link href={link.href} key={link.href}>
          {copy.links[link.id]}
        </Link>
      ))}
    </div>
  );
}

export function Footer() {
  const copy = useCopy("footer");

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <Link className="logo logo-light footer-logo" href="#home">
            stqck<span className="logo-dot">.</span>
          </Link>
          <p>
            {copy.taglineLine1}
            <br />
            {copy.taglineLine2}
          </p>
        </div>
        <div className="footer-grid">
          {footerColumns.map((column) => (
            <FooterLinkColumn
              key={column.id}
              label={copy.columns[column.id]}
              links={column.links}
            />
          ))}
          <div className="newsletter">
            <span className="detail-label">{copy.newsletter.label}</span>
            <div className="newsletter-field">
              <Field
                name="newsletter"
                placeholder={copy.newsletter.placeholder}
                type="email"
              />
              <Button
                ariaLabel={copy.newsletter.aria}
                className="newsletter-button"
              >
                <Arrow />
              </Button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{copy.bottom.copyright}</span>
          <span>{copy.bottom.note}</span>
          <Link href="#home">{copy.bottom.backToTop}</Link>
        </div>
      </div>
    </footer>
  );
}
