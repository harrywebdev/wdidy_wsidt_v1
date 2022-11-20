import View from "../components/View"
import Overview from "./Overview"

const styles = {
  heading1: {
    marginTop: 0,
  },
}

export default function IndexPage() {
  return (
    <View>
      <h1 style={styles.heading1}>WDIDY? WSIDT?</h1>

      <Overview />
    </View>
  )
}
