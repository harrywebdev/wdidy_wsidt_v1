import View from "../../components/View"
import AppHeader from "../../components/AppHeader"
import ShowMnemonic from "./ShowMnemonic"
import RestoreData from "./RestoreData"
import DeleteData from "./DeleteData"

export default function SettingsIndexPage() {
  return (
    <View>
      <AppHeader />
      <h2>Settings</h2>

      <ShowMnemonic />
      <hr />
      <RestoreData />
      <hr />
      <DeleteData />
    </View>
  )
}
