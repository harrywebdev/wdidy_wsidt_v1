import { FC, FormEventHandler } from "react"
import { ActivityTypeId } from "../lib/db"
import { Integer, NonEmptyString1000 } from "evolu"

type ActivityTypeOverviewProps = {
  activityType: {
    id: ActivityTypeId
    title: NonEmptyString1000 | null
    weight: Integer | null
  }
  buttonLabel: string
  onButtonClick: (atId: ActivityTypeId) => void
  activitiesCount: number
}

const ActivityTypeOverview: FC<ActivityTypeOverviewProps> = ({
  activityType,
  buttonLabel,
  onButtonClick,
  activitiesCount,
}) => {
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    onButtonClick(activityType.id)
  }

  const hasScore = activityType.weight !== null && activityType.weight > 0
  const score = (activityType.weight || 0) * activitiesCount

  return (
    <div>
      <h3>
        {activityType.title} {hasScore ? `(${score})` : ""}
      </h3>
      <p>{activitiesCount} occurrences</p>
      <form onSubmit={handleFormSubmit}>
        <button type={"submit"}>{buttonLabel}</button>
      </form>
      <hr />
    </div>
  )
}

export default ActivityTypeOverview
