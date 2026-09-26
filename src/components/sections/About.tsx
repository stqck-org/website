import type { ReactNode } from "react";

import { Arrow } from "../ui/Arrow";
import { Heading } from "../ui/Heading";
import { Link } from "../ui/Link";

/** The brand-system cards in the right-hand column of the About grid. */
const principles = ["Make it useful.", "Make it memorable.", "Make it last."];

function BrandCard({
  variant,
  meta,
  children,
}: {
  variant: string;
  meta: string;
  children: ReactNode;
}) {
  return (
    <div className={`brand-card ${variant}`}>
      <span className="brand-meta">{meta}</span>
      {children}
    </div>
  );
}

export function About() {
  return (
    <section className="about section-light" id="about">
      <div className="shell">
        <div className="section-label reveal">
          <span>01</span>
          <span>Who we are</span>
        </div>
        <div className="about-grid">
          <div className="about-manifesto reveal">
            <Heading as="h2">
              We build digital products for people moving culture forward.
            </Heading>
            <p>
              Nordic Loop is a close-knit studio of designers, engineers, and
              strategists. We partner with ambitious teams from first sketch
              to shipped product—bringing rigor to the complex and character
              to the everyday.
            </p>
            <Link className="text-link" href="#work">
              Our approach <Arrow />
            </Link>
          </div>
          <div className="brand-grid reveal">
            <BrandCard variant="brand-mark" meta="MARK / 01">
              <div className="loop-mark">
                <span>N</span>
                <span>L</span>
              </div>
            </BrandCard>
            <BrandCard variant="color-card" meta="PALETTE / 02">
              <div className="swatches">
                <span className="swatch swatch-black" />
                <span className="swatch swatch-blue" />
                <span className="swatch swatch-white" />
              </div>
              <span className="color-name">ELECTRIC / #2457FF</span>
            </BrandCard>
            <BrandCard variant="type-card" meta="TYPE / 03">
              <div className="type-sample">Aa</div>
              <div className="type-note">
                Archivo Black
                <br />
                Inter
              </div>
            </BrandCard>
            <BrandCard variant="principle-card" meta="PRINCIPLES / 04">
              <ol>
                {principles.map((principle) => (
                  <li key={principle}>{principle}</li>
                ))}
              </ol>
            </BrandCard>
          </div>
        </div>
      </div>
    </section>
  );
}
