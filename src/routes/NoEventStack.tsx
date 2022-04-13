import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { IEvent } from '../models/IEvent'
import DownloadEvent from '../pages/DownloadEvent/DownloadEvent'
import EventsSelection from '../pages/EventSelection/EventsSelection'
import { useEventsState } from '../reducers/eventsReducer'

export type NoEventStackParamList = {
  EventsSelection: undefined
  DownloadEvent: { event: IEvent }
}

const Stack = createStackNavigator<NoEventStackParamList>()
const NoEventStack = () => {
  const { hasToUpdate } = useEventsState()
  return (
    <Stack.Navigator
      initialRouteName={hasToUpdate ? 'DownloadEvent' : 'EventsSelection'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="EventsSelection" component={EventsSelection} />
      <Stack.Screen name="DownloadEvent" component={DownloadEvent} />
    </Stack.Navigator>
  )
}

export default NoEventStack
