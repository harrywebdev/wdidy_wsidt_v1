import { createHooks, model } from "evolu"
import { NonEmptyString1000 } from "evolu/src/model"

export const ActivityTypeId = model.id<"activityType">()
export type ActivityTypeId = model.infer<typeof ActivityTypeId>

export const HashtagId = model.id<"hashtag">()
export type HashtagId = model.infer<typeof HashtagId>
export type HashtagTitle = NonEmptyString1000

export const ActivityId = model.id<"activity">()
export type ActivityId = model.infer<typeof ActivityId>

// FEEDBACK: would be nice to have a `ActivityType` and others
// from this DB schema to use elsewhere, like type for cmp prop
export const { useQuery, useMutation } = createHooks({
  activityType: {
    id: ActivityTypeId,
    title: model.NonEmptyString1000,
    weight: model.Integer,
  },

  hashtag: {
    id: HashtagId,
    title: model.NonEmptyString1000,
  },

  activity: {
    id: ActivityId,
    activityTypeId: ActivityTypeId,
    activityDate: model.SqliteDateTime,
    note: model.String1000,
    isCompleted: model.SqliteBoolean,
  },

  // n:n relationship
  activitiesHashtags: {
    id: model.id<"activitiesHashtags">(),
    activityId: ActivityId,
    hashtagId: HashtagId,
  },
})
