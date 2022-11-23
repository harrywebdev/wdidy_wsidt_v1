import { useQuery } from "../lib/db"
import { model } from "evolu"

export default function useActivityTypes() {
  const { rows, isLoaded } = useQuery(function selectActivityTypes(db) {
    return db
      .selectFrom("activityType")
      .select(["id", "title", "weight"])
      .where("isDeleted", "is not", model.cast(true))
  })

  return { rows, isLoaded }
}
