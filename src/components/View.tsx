import { FC, ReactNode } from "react"
import styles from "./View.module.css"

const View: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default View
