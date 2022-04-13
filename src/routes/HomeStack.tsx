import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { IAd } from '../models/IFullEvent'
import AdModal from '../pages/AdModal/AdModal'
import EventHome from '../pages/EventHome/EventHome'

export type NoEventStackParamList = {
  EventHome: undefined
  AdModal: IAd
}

const Stack = createStackNavigator<NoEventStackParamList>()
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={'EventHome'} screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="EventHome" component={EventHome} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="AdModal" component={AdModal} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default HomeStack
