import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OneToOneAgenda from '../pages/OneToOneAgenda/OneToOneAgenda'
import CatalogueDetail from '../pages/CatalogueDetail/CatalogueDetail'
import { IActivityDetail, ICatalogue } from '../models/IFullEvent'
import AgendaDetail from '../pages/AgendaDetail/AgendaDetail'
import CreateEvent from '../pages/CreateEvent/CreateEvent'

export type OneToOneAgendaParamList = {
  Tabs: undefined
  CatalogueDetail: ICatalogue
  AgendaDetail: IActivityDetail[]
  CreateEvent: undefined
}

const Stack = createStackNavigator<OneToOneAgendaParamList>()
const OneToOneAgendaStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={OneToOneAgenda} />
      <Stack.Screen name="CatalogueDetail" component={CatalogueDetail} />
      <Stack.Screen name="AgendaDetail" component={AgendaDetail} />
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
    </Stack.Navigator>
  )
}

export default OneToOneAgendaStack
