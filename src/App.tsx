import { RouterProvider, type DataRouter } from "react-router"
import { LocaleProvider } from "./i18n/Locale"

type AppProps = {
  router: DataRouter
}

export default function App({ router }: AppProps) {
  return (
    <LocaleProvider>
      <RouterProvider router={router} />
    </LocaleProvider>
  )
}
