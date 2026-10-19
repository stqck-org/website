import { createElement, type ReactNode } from "react";

/**
 * Themed button. Renders a literal `class` attribute even when empty, so the
 * `className = ""` default is intentional — do not change it to `undefined`.
 * `aria-pressed` is only emitted when the caller passes it.
 */
export function Button({
  children,
  className = "",
  type = "button",
  onClick,
  ariaLabel,
  ariaPressed,
}: {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  ariaLabel?: string;
  ariaPressed?: boolean;
}) {
  return createElement(
    "button",
    { className, type, onClick, "aria-label": ariaLabel, "aria-pressed": ariaPressed },
    children,
  );
}
