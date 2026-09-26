import { Arrow } from "../ui/Arrow";
import { Button } from "../ui/Button";
import { Field } from "../ui/Field";
import { Link } from "../ui/Link";

const linkColumns = [
  {
    label: "Explore",
    links: [
      { label: "Studio", href: "#about" },
      { label: "Work", href: "#work" },
      { label: "Team", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    label: "Social",
    links: [
      { label: "Instagram ↗", href: "#instagram" },
      { label: "LinkedIn ↗", href: "#linkedin" },
      { label: "Dribbble ↗", href: "#dribbble" },
    ],
  },
];

function FooterLinkColumn({
  label,
  links,
}: {
  label: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="footer-links">
      <span className="detail-label">{label}</span>
      {links.map((link) => (
        <Link href={link.href} key={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <Link className="logo logo-light footer-logo" href="#home">
            stqck<span className="logo-dot">.</span>
          </Link>
          <p>
            Designing and engineering digital
            <br />
            products from first principles.
          </p>
        </div>
        <div className="footer-grid">
          {linkColumns.map((column) => (
            <FooterLinkColumn
              key={column.label}
              label={column.label}
              links={column.links}
            />
          ))}
          <div className="newsletter">
            <span className="detail-label">Occasional signals, no noise</span>
            <div className="newsletter-field">
              <Field
                name="newsletter"
                placeholder="Email address"
                type="email"
              />
              <Button
                ariaLabel="Subscribe to newsletter"
                className="newsletter-button"
              >
                <Arrow />
              </Button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 stqck Studio</span>
          <span>Independent · Remote-first</span>
          <Link href="#home">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
