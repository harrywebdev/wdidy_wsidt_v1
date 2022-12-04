"use client"

import { useEffect } from "react"

export default function AppStart() {
  useEffect(() => {
    // empty service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (/*registration*/) {
            // PWA ready
          },
          function (/*err*/) {
            // oops
          },
        )
      })
    }
  }, [])

  return null
}
