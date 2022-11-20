"use client"

import { ActivityTypeId, HashtagId, useMutation, useQuery } from "../lib/db"
import { model, useEvoluFirstDataAreLoaded } from "evolu"
import { FC, FormEventHandler, useState } from "react"
import Link from "next/link"
import ActivityTypeOverview from "./ActivityTypeOverview"
import HashtagOverview from "./HashtagOverview"
import Spinner from "../components/Spinner"
import AddNewHashtag from "./AddNewHashtag"
import { sql } from "kysely"

type OverviewProps = {}

const Overview: FC<OverviewProps> = () => {
  // FEEDBACK: I would rename to `useEvoluFirstDataIsLoading` and inverse the flag
  const isDataLoading = !useEvoluFirstDataAreLoaded()
  const { mutate } = useMutation()
  const [logActivityTypeId, setLogActivityTypeId] =
    useState<ActivityTypeId | null>(null)
  const [selectedHashtagIds, setSelectedHashtagIds] = useState<Set<HashtagId>>(
    new Set(),
  )

  // start with today
  const today = new Date()
  const [activityDate, setActivityDate] = useState<string>(
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
  )

  const isActivityTypeIdSelected = logActivityTypeId !== null

  const { rows: activityTypes } = useQuery(function selectActivityTypes(db) {
    return db
      .selectFrom("activityType")
      .select(["id", "title", "weight"])
      .where("isDeleted", "is not", model.cast(true))
  })

  const { rows: hashtags } = useQuery(function selectHashtags(db) {
    return db
      .selectFrom("hashtag")
      .select(["id", "title"])
      .where("isDeleted", "is not", model.cast(true))
  })

  const { rows: activities } = useQuery(function selectActivities(db) {
    // FEEDBACK: I don't see SQL statement errors anywhere, maybe they shouuld console.err?
    return db
      .selectFrom("activity")
      .leftJoin(
        "activitiesHashtags",
        "activitiesHashtags.activityId",
        "activity.id",
      )
      .select([
        "activity.id",
        "activity.activityTypeId",
        "activity.activityDate",
        sql<string>`group_concat(activitiesHashtags.hashtagId)`.as(
          "hashtagIds",
        ),
      ])
      .where("activity.isDeleted", "is not", model.cast(true))
      .groupBy("activity.id")
      .orderBy("activityDate", "desc")
  })

  if (isDataLoading) {
    return <Spinner />
  }

  if (!activityTypes.length) {
    return (
      <>
        <p>No activity types found. Forgot to seed the database?</p>
        <p>
          <Link href={"/settings/db-seed"}>Seed DB</Link>
        </p>
      </>
    )
  }

  const resetSelection = () => {
    setLogActivityTypeId(null)

    // also reset selected hashtags
    setSelectedHashtagIds(new Set())
  }

  const onActivityTypeButtonClick = (activityTypeId: ActivityTypeId) => {
    // cancel
    if (logActivityTypeId === activityTypeId) {
      resetSelection()
      return
    }

    setLogActivityTypeId(activityTypeId)
  }

  const onHashtagClick = (hashtagId: HashtagId) => {
    const newSet = new Set(selectedHashtagIds)
    if (newSet.has(hashtagId)) {
      newSet.delete(hashtagId)
    } else {
      newSet.add(hashtagId)
    }

    setSelectedHashtagIds(newSet)
  }

  const handleActivityDateChange: FormEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setActivityDate(event.currentTarget.value)
  }

  const onLogActivityButtonClick = () => {
    const hashtags = Array.from(selectedHashtagIds)

    const { id } = mutate("activity", {
      activityTypeId: logActivityTypeId,
      activityDate: model.cast(new Date(activityDate)),
      note: null,
      isCompleted: model.cast(true),
    })

    hashtags.forEach((hashtagId, index) => {
      mutate(
        "activitiesHashtags",
        {
          activityId: id,
          hashtagId,
        },
        () => {
          if (index === hashtags.length - 1) {
            resetSelection()
            alert("Activity logged.")
          }
        },
      )
    })
  }

  const activityTypesList =
    logActivityTypeId !== null
      ? activityTypes.filter(
          (activityType) => activityType.id === logActivityTypeId,
        )
      : activityTypes

  return (
    <>
      <div
        style={isActivityTypeIdSelected ? { border: "1px solid black" } : {}}
      >
        {activityTypesList.map((activityType) => (
          <ActivityTypeOverview
            key={activityType.id}
            activityType={activityType}
            buttonLabel={isActivityTypeIdSelected ? "Cancel" : "Log"}
            onButtonClick={onActivityTypeButtonClick}
            activitiesCount={
              activities.filter(
                (activity) => activity.activityTypeId === activityType.id,
              ).length
            }
          />
        ))}
      </div>

      {isActivityTypeIdSelected && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {hashtags.map((hashtag) => (
            <HashtagOverview
              key={hashtag.id}
              hashtag={hashtag}
              isSelected={selectedHashtagIds.has(hashtag.id)}
              onClick={onHashtagClick}
            />
          ))}
          {/*  TODO: move this to modal so we can have a semantic html form */}
          <AddNewHashtag />

          <fieldset>
            <legend>Activity Date</legend>

            <input
              type="date"
              value={activityDate}
              onChange={handleActivityDateChange}
            />

            <p>
              <button
                onClick={onLogActivityButtonClick}
                style={{
                  fontSize: "large",
                  fontWeight: "bold",
                }}
              >
                Log this activity
              </button>
            </p>
          </fieldset>

          <pre
            style={{
              wordBreak: "break-all",
              whiteSpace: "break-spaces",
            }}
          >
            {`
activity: {
  id: null,
  activityType: ${logActivityTypeId},
  activityDate: ${new Date(activityDate)},
  note: null,
  isCompleted: true,
  hashtags: [${Array.from(selectedHashtagIds).join(",")}]
}
`}
          </pre>
        </div>
      )}

      {activities.map((activity) => (
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

export default Overview
