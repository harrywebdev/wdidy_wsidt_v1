"use client"

import { FC, FormEventHandler, useState } from "react"
import { HashtagTitle, useMutation } from "../lib/db"
import { NonEmptyString1000 } from "evolu"

type AddNewHashtagProps = {}

const AddNewHashtag: FC<AddNewHashtagProps> = () => {
  const [newHashtag, setNewHashtag] = useState<HashtagTitle>(
    NonEmptyString1000.parse("#"),
  )

  const { mutate } = useMutation()

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    mutate("hashtag", { title: newHashtag }, () => {
      alert(`Hashtag ${newHashtag} added.`)
      setNewHashtag(NonEmptyString1000.parse("#"))
    })
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <fieldset>
        <legend>Add new Hashtag</legend>
        <label htmlFor="new_hashtag">New Hashtag:</label>
        <input
          type="text"
          name={"new_hashtag"}
          value={newHashtag}
          onChange={(event) =>
            setNewHashtag(NonEmptyString1000.parse(event.target.value))
          }
        />
        <button type={"submit"}>Save</button>
      </fieldset>
    </form>
  )
}

export default AddNewHashtag
