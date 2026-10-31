import { RouterProvider } from "react-router"
import { LocaleProvider } from "./i18n/Locale"
import { router } from "./routes"

export default function App() {
  return (
    <LocaleProvider>
      <RouterProvider router={router} />
    </LocaleProvider>
  )
}
