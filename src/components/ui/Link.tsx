import type { AnchorHTMLAttributes } from "react"
import { Link, type LinkProps } from "react-router"

export function TextLink({ className = "", ...props }: LinkProps) {
  return <Link className={`text-link ${className}`} {...props} />
}

export function Anchor({
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={className} {...props} />
}

export function ActionLink({
  variant = "dark",
  className = "",
  ...props
}: LinkProps & { variant?: "dark" | "acid" }) {
  return (
    <Link className={`action action--${variant} ${className}`} {...props} />
  )
}
