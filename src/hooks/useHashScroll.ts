import { useEffect, useRef } from "react"
import { useLocation } from "react-router"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

// Scrolls to the section named in the URL hash. React Router does not do
// this for client-side navigation, and the router's `key` dependency makes
// re-clicking the current section work as well.
export function useHashScroll() {
  const { hash, key } = useLocation()
  const firstRun = useRef(true)

  // The browser's own scroll restoration would otherwise fight the hash
  // scroll on back/forward, landing between sections.
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  useEffect(() => {
    const id = hash.replace(/^#/, "")
    const isFirstRun = firstRun.current
    firstRun.current = false

    if (!id) {
      if (!isFirstRun) {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        })
      }
      return
    }

    const target = document.getElementById(id)
    if (!target) return

    target.scrollIntoView({
      behavior: isFirstRun
        ? "instant"
        : prefersReducedMotion()
          ? "auto"
          : "smooth",
      block: "start",
    })

    // Move focus so keyboard and screen reader users follow the jump,
    // but never steal focus on the initial page load.
    if (!isFirstRun && target.hasAttribute("tabindex")) {
      target.focus({ preventScroll: true })
    }
  }, [hash, key])
}
