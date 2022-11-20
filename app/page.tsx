'use client'

import { StyleSheet, Text, View, FlatList } from 'react-native'
import { FC } from 'react'

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  heading1: {
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 24,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})

type activityByType = {
  title: string
}

type hashtag = {
  title: string
}

const model = {
  activitiesByType: [
    { title: '🤖 Work' },
    { title: '👨‍👩‍👦 Family' },
    { title: '🎩 Me alone' },
    { title: '♥️ Me with Edita' },
    { title: '👦 Me with Jonas' },
  ],
  hashtags: [
    { title: '#goodhealth☯️' },
    { title: '#house🏠' },
    { title: '#alcohol🍺' },
    { title: '#smoking🚬' },
    { title: '#luck🍀' },
  ],
}

const ActivityByTypeItem: FC<{ item: activityByType }> = ({ item }) => {
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  )
}

const renderActivityByTypeItem: FC<{ index: number; item: activityByType }> = ({
  index,
  item,
}) => {
  return <ActivityByTypeItem item={item} />
}

export default function Page() {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.heading1}>
        WDIDY? WSIDT?
      </Text>

      <FlatList
        data={model.activitiesByType}
        keyExtractor={(item: activityByType) => item.title}
        renderItem={renderActivityByTypeItem}
      />
    </View>
  )
}
