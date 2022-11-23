"use client"

import { FC, useEffect, useState } from "react"
import { getError, subscribeError } from "evolu"
import GlobalNotification, {
  GlobalNotificationType,
} from "../components/GlobalNotification"

type NotificationHandlerProps = {
  //
}

const NotificationHandler: FC<NotificationHandlerProps> = () => {
  const [notificationMessage, setNotificationMessage] = useState<string>("")

  // show DB errors
  useEffect(() => {
    const notifyOnError = () => {
      const error = getError()
      if (error === null) {
        return
      }

      console.error(error.error)

      // use message, if it exists
      if (error.error.type === "UnknownError") {
        // FEEDBACK: quite a wrap on the error to get to the actual error
        setNotificationMessage(`Error: ${error.error.error.message}`)
      } else {
        setNotificationMessage("Oops, something went wrong.")
      }
    }

    return subscribeError(notifyOnError)
  }, [])

  if (!notificationMessage) {
    return <></>
  }

  return (
    <GlobalNotification
      message={notificationMessage}
      type={GlobalNotificationType.error}
    />
  )
}

export default NotificationHandler
