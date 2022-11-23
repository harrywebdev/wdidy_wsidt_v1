import { FC, ReactNode } from "react"
import "./global.css"
import NotificationHandler from "./NotificationHandler"

type RootLayoutProps = { children: ReactNode }

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body>
        <NotificationHandler />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
