import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ICatalogue } from '../models/IFullEvent'
import Catalogue from '../pages/Catalogue/Catalogue'
import CatalogueDetail from '../pages/CatalogueDetail/CatalogueDetail'

export type CatalogueStackParamList = {
  Catalogue: { canGoBack: boolean }
  Detail: ICatalogue
}

const Stack = createStackNavigator<CatalogueStackParamList>()
const CatalogueStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Catalogue" component={Catalogue} />
      <Stack.Screen name="Detail" component={CatalogueDetail} />
    </Stack.Navigator>
  )
}

export default CatalogueStack
