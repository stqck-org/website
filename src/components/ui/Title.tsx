import type { ReactNode } from "react"

type TitleProps = {
  as?: "h1" | "h2" | "h3" | "h4"
  className?: string
  children: ReactNode
}

export function Title({
  as: Tag = "h2",
  className = "",
  children,
}: TitleProps) {
  return <Tag className={className}>{children}</Tag>
}
