"use client"

import { FC } from "react"
import { restoreOwner } from "evolu"

type RestoreDataProps = {
  //
}

const RestoreData: FC<RestoreDataProps> = () => {
  const onRestoreDataClick = () => {
    const mnemonic = prompt("Your Mnemonic")
    if (mnemonic === null) return

    const either = restoreOwner(mnemonic)
    if (either._tag === "Left") alert(JSON.stringify(either.left, null, 2))
  }

  return (
    <p>
      Open this page on a different device and use your mnemonic to restore your
      data.
      <br />
      <button onClick={onRestoreDataClick}>Restore data</button>
    </p>
  )
}

export default RestoreData
