import { FC } from "react"
import styles from "./GlobalNotification.module.css"

export enum GlobalNotificationType {
  success = "success",
  error = "error",
}

type GlobalNotificationProps = {
  message: string
  type: GlobalNotificationType
}

const GlobalNotification: FC<GlobalNotificationProps> = ({ message, type }) => {
  return (
    <div className={`${styles.container} ${styles[type.toString()]}`}>
      {message}
    </div>
  )
}

export default GlobalNotification
