"use client"

import { FC } from "react"
import { model, useEvoluFirstDataAreLoaded } from "evolu"
import { useQuery } from "../../lib/db"
import { sql } from "kysely"
import Spinner from "../../components/Spinner"

type ActivitiesListProps = {
  //
}

const ActivitiesList: FC<ActivitiesListProps> = () => {
  const isDataLoading = !useEvoluFirstDataAreLoaded()

  const { rows: activities } = useQuery(function selectActivities(db) {
    // FEEDBACK: I don't see SQL statement errors anywhere, maybe they should console.err?
    return db
      .selectFrom("activity")
      .leftJoin(
        "activitiesHashtags",
        "activitiesHashtags.activityId",
        "activity.id",
      )
      .leftJoin("activityType", "activityType.id", "activity.activityTypeId")
      .select([
        "activity.id",
        "activity.activityTypeId",
        "activity.activityDate",
        sql<string>`group_concat(activitiesHashtags.hashtagId)`.as(
          "hashtagIds",
        ),
        "activityType.title as activityTypeTitle",
      ])
      .where("activity.isDeleted", "is not", model.cast(true))
      .groupBy("activity.id")
      .orderBy("activityDate", "desc")
  })

  const { rows: hashtags } = useQuery(function selectHashtags(db) {
    return db
      .selectFrom("hashtag")
      .select(["id", "title"])
      .where("isDeleted", "is not", model.cast(true))
  })

  if (isDataLoading) {
    return <Spinner />
  }

  if (!activities.length) {
    return <p>No activities found.</p>
  }

  const activitiesList = activities.map((activity) => {
    return {
      ...activity,
      hashtags: hashtags.filter(
        (hashtag) =>
          activity.hashtagIds !== null &&
          activity.hashtagIds.indexOf(hashtag.id) >= 0,
      ),
    }
  })

  return (
    <>
      {activitiesList.map((activity) => (
        <pre
          key={activity.id}
          style={{
            wordBreak: "break-all",
            whiteSpace: "break-spaces",
          }}
        >
          {JSON.stringify(activity, null, 2)}
        </pre>
      ))}
    </>
  )
}

export default ActivitiesList
