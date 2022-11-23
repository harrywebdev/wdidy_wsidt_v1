"use client"

import { FC } from "react"
import { resetOwner } from "evolu"

type DeleteDataProps = {
  //
}

const DeleteData: FC<DeleteDataProps> = () => {
  const onDeleteDataClick = () => {
    if (confirm("Are you sure? It will delete all your local data.")) {
      resetOwner()
    }
  }

  return (
    <p>
      Delete all your data from this device.
      <br />
      <button onClick={onDeleteDataClick}>Delete data</button>
    </p>
  )
}

export default DeleteData
