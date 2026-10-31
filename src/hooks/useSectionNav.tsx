import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type SectionNavValue = {
  active: string
  setActive: (id: string) => void
}

const SectionNavContext = createContext<SectionNavValue | null>(null)

export function SectionNavProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("home")
  const value = useMemo(() => ({ active, setActive }), [active])

  return (
    <SectionNavContext.Provider value={value}>
      {children}
    </SectionNavContext.Provider>
  )
}

export function useSectionNav() {
  const value = useContext(SectionNavContext)
  if (!value) {
    throw new Error("useSectionNav must be used within SectionNavProvider")
  }
  return value
}
