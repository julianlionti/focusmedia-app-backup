import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import NoEventStack from '../NoEventStack'
import EventDrawer from '../EventDrawer'
import useMain from './useMain'

const Main = () => {
  const { selectedEvent, hasToUpdate } = useMain()
  return (
    <NavigationContainer>
      {(!selectedEvent || hasToUpdate) && <NoEventStack />}
      {selectedEvent && !hasToUpdate && <EventDrawer />}
    </NavigationContainer>
  )
}

export default Main
