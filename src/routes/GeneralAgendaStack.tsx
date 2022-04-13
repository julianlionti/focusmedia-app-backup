import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import GeneralAgenda from '../pages/GeneralAgenda/GeneralAgenda'
import AgendaDetail from '../pages/AgendaDetail/AgendaDetail'
import { IActivityDetail } from '../models/IFullEvent'

export type GeneralAgendaStackParamList = {
  Agenda: undefined
  Detail: IActivityDetail[]
}

const Stack = createStackNavigator<GeneralAgendaStackParamList>()
const GeneralAgendaStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Agenda" component={GeneralAgenda} />
      <Stack.Screen name="Detail" component={AgendaDetail} />
    </Stack.Navigator>
  )
}

export default GeneralAgendaStack
