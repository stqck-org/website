import { createElement, type ReactNode } from "react";

/**
 * Form control that can render an input, textarea, or select. Unlike Button and
 * Link this has no `className` default, so an unstyled field renders no `class`
 * attribute at all. Do not add a default.
 */
export function Field({
  as = "input",
  ...props
}: {
  as?: "input" | "textarea" | "select";
  className?: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  children?: ReactNode;
  rows?: number;
}) {
  return createElement(as, props);
}
