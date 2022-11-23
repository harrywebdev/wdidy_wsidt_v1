import { useQuery } from "../lib/db"
import { model } from "evolu"

export default function useHashtags() {
  const { rows, isLoaded } = useQuery(function selectHashtags(db) {
    return db
      .selectFrom("hashtag")
      .select(["id", "title"])
      .where("isDeleted", "is not", model.cast(true))
  })

  return { rows, isLoaded }
}
