import { Title } from "./ui"

type PageIntroProps = {
  index: string
  eyebrow: string
  title: string
  copy: string
}

export function PageIntro({ index, eyebrow, title, copy }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="page-intro__meta">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <Title as="h1">{title}</Title>
      <p>{copy}</p>
    </section>
  )
}
