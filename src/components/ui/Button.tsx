import { createElement, type ReactNode } from "react";

/**
 * Themed button. Renders a literal `class` attribute even when empty, so the
 * `className = ""` default is intentional — do not change it to `undefined`.
 */
export function Button({
  children,
  className = "",
  type = "button",
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return createElement(
    "button",
    { className, type, onClick, "aria-label": ariaLabel },
    children,
  );
}
