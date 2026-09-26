import { createElement, type ReactNode } from "react";

/**
 * Anchor with an optional accessible name. Keeps the `className = ""` default
 * for the same reason as Button — it emits a literal `class` attribute.
 */
export function Link({
  children,
  className = "",
  href,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  ariaLabel?: string;
}) {
  return createElement(
    "a",
    { className, href, "aria-label": ariaLabel },
    children,
  );
}
