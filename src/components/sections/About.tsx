import type { ReactNode } from "react";

import { Arrow } from "../ui/Arrow";
import { Heading } from "../ui/Heading";
import { Link } from "../ui/Link";

/**
 * One of the two stacked About blocks. `.about-block` is a direct child of
 * `.about-blocks`, so it carries `reveal` itself: wrapping the element would
 * break the grid and the scroll reveal. See useRevealOnScroll.
 *
 * `variant` picks the horizontal inset that makes the pair read as a diagonal
 * (see `.about-block.lead` in index.css), so it is a closed union.
 */
function AboutBlock({
  variant,
  meta,
  title,
  children,
}: {
  variant: "lead" | "follow";
  meta: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={`about-block ${variant} reveal`}>
      <span className="detail-label">{meta}</span>
      <Heading as="h2">{title}</Heading>
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
        <div className="about-blocks">
          <AboutBlock
            variant="lead"
            meta=""
            title="stqck"
          >
            <p>
                PRONOUNCED LIKE "STACK."
                THE Q IS THE TWIST —
                STRUCTURE, WITH PERSONALITY.
            </p>
            {/* <Link className="text-link" href="#work">
              Our approach <Arrow />
            </Link> */}
          </AboutBlock>
          <AboutBlock
            variant="follow"
            meta=""
            title="CHILL.
                  COMPETENT.
                  EASY TO TALK TO."
          >
            <p>
                NO JARGON WITHOUT
                EXPLANATION.
                HONEST ABOUT LIMITS.
                FRIENDLY TEAM — NOT AN
                IVORY TOWER.
            </p>
          </AboutBlock>
        </div>
      </div>
    </section>
  );
}
