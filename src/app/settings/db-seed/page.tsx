"use client"

import View from "../../../components/View"
import { useMutation, useQuery } from "../../../lib/db"
import { Integer, model, NonEmptyString1000 } from "evolu"
import Link from "next/link"
import AppHeader from "../../../components/AppHeader"

const activityTypes = [
  { title: "🤖 Work", weight: 0 },
  { title: "👨‍👩‍👦 Family", weight: 4 },
  { title: "🎩 Me alone", weight: 4 },
  { title: "♥️ Me with Edita", weight: 8 },
  { title: "👦 Me with Jonas", weight: 4 },
]

const hashtags = [
  { title: "#goodhealth☯️" },
  { title: "#housechore🧹" },
  { title: "#alcohol🍺" },
  { title: "#smoking🚬" },
  { title: "#luck🍀" },
]

export default function SettingsDbSeedPage() {
  const { mutate } = useMutation()

  const { rows: existingActivityTypes } = useQuery(function selectActivityTypes(
    db,
  ) {
    return db
      .selectFrom("activityType")
      .select(["id", "title"])
      .where("isDeleted", "is not", model.cast(true))
  })

  const { rows: existingHashtags } = useQuery(function selectActivityTypes(db) {
    return db
      .selectFrom("hashtag")
      .select(["id", "title"])
      .where("isDeleted", "is not", model.cast(true))
  })

  if (existingActivityTypes.length === 0) {
    const seedActivityTypes = () => {
      activityTypes.forEach((record) => {
        const title = NonEmptyString1000.parse(record.title)
        const weight = Integer.parse(record.weight)
        mutate("activityType", { title, weight })
      })
    }
    return (
      <View>
        <AppHeader />
        <button onClick={seedActivityTypes}>Seed Activity Types</button>
      </View>
    )
  }

  if (existingHashtags.length === 0) {
    const seedHashtags = () => {
      hashtags.forEach((record) => {
        const title = NonEmptyString1000.parse(record.title)
        mutate("hashtag", { title })
      })
    }
    return (
      <View>
        <AppHeader />
        <button onClick={seedHashtags}>Seed Hashtags</button>
      </View>
    )
  }

  return (
    <View>
      <AppHeader />
      <p>Nothing to do here</p>
      <p>
        <Link href={"/"}>Go to Overview</Link>
      </p>
    </View>
  )
}
