import { useEffect } from "react"

type PageMetaProps = {
  title: string
  description: string
}

export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = `${title} — stqck`

    let element = document.querySelector('meta[name="description"]')
    if (!element) {
      element = document.createElement("meta")
      element.setAttribute("name", "description")
      document.head.appendChild(element)
    }
    element.setAttribute("content", description)
  }, [title, description])

  return null
}
