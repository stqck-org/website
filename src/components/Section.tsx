import type { ReactNode } from "react"

type SectionProps = {
  id: string
  className?: string
  children: ReactNode
}

export function Section({ id, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      className={`page-section ${className}`.trim()}
      data-section={id}
      tabIndex={-1}
    >
      {children}
    </section>
  )
}
