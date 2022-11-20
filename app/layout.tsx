import { FC, ReactNode } from 'react'

type RootLayoutProps = { children: ReactNode }

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
