import { createElement, type ReactNode } from "react";

/** Heading that picks its own tag so section levels stay centralised. */
export function Heading({
  as,
  children,
  className = "",
}: {
  as: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
}) {
  return createElement(as, { className }, children);
}
