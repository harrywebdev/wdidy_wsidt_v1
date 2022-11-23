import { FC } from "react"
import Link from "next/link"

type AppHeaderProps = {
  //
}

const styles = {
  heading: {
    marginTop: 0,
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  navItem: {
    display: "inline-block",
    padding: 5,
  },
}

const AppHeader: FC<AppHeaderProps> = () => {
  return (
    <>
      <h1 style={styles.heading}>WDIDY? WSIDT?</h1>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link href={"/"}>Index</Link>
          </li>
          <li style={styles.navItem}>
            <Link href={"/settings"}>Settings</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default AppHeader
