import type { HTMLAttributes, ReactNode } from "react"

type TitleProps = {
  as?: "h1" | "h2" | "h3" | "h4"
  className?: string
  children: ReactNode
} & Omit<HTMLAttributes<HTMLHeadingElement>, "children" | "className">

export function Title({
  as: Tag = "h2",
  className = "",
  children,
  ...rest
}: TitleProps) {
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  )
}
