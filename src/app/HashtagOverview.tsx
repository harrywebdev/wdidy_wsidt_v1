import { FC, FormEventHandler } from "react"
import { HashtagId } from "../lib/db"
import { NonEmptyString1000 } from "evolu"

type HashtagOverviewProps = {
  hashtag: {
    id: HashtagId
    title: NonEmptyString1000 | null
  }
  isSelected: boolean
  onClick: (hashtagId: HashtagId) => void
}

const HashtagOverview: FC<HashtagOverviewProps> = ({
  hashtag,
  isSelected,
  onClick,
}) => {
  const handleInputChange: FormEventHandler = () => {
    onClick(hashtag.id)
  }

  return (
    <label
      style={{
        display: "inline-block",
        padding: 5,
        fontSize: "large",
        border: `1px solid ${isSelected ? "black" : "white"}`,
        margin: 4,
        // color: isSelected ? "white" : "black",
        // background: isSelected ? "black" : "white",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <input
        type="checkbox"
        name={"hashtag"}
        value={hashtag.id}
        onChange={handleInputChange}
        checked={isSelected}
      />
      {hashtag.title}
    </label>
  )
}

export default HashtagOverview
