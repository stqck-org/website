import { useEffect } from "react"

// Tracks which section crosses the middle of the viewport. A thin
// rootMargin band keeps at most one section active at a time and avoids
// scroll listeners entirely.
export function useActiveSection(onChange: (id: string) => void) {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    )
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const closest = entries
          .filter((entry) => entry.isIntersecting && entry.target.id)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          )[0]
        if (closest) onChange(closest.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [onChange])
}
