import { useLayoutEffect, type RefObject } from "react"

// Adds `is-visible` to every `[data-reveal]` element once it enters the
// viewport. The `reveal-active` class is only added when JS runs, so the
// pre-hidden state can never leave content invisible.
export function useRevealOnScroll(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    )
    if (!targets.length) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"))
      return
    }

    root.classList.add("reveal-active")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [rootRef])
}
