import { FC, ReactNode } from "react"
import "./global.css"
import NotificationHandler from "./NotificationHandler"
import AppStart from "./AppStart"

type RootLayoutProps = { children: ReactNode }

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body>
        <AppStart />
        <NotificationHandler />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
