import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Text, View } from 'native-base'
import React, { Suspense } from 'react'
import EmptyListRoot from '../EmptyListRoot'
import Loading from '../Loading'
import useTopTabs from './useTopTabs'

export type ITab<T> = { id: string; title: string; data: T }
interface Props<T> {
  render: (tab: T, id: string) => JSX.Element | null
  tabs: ITab<T>[]
  noHeader?: boolean
  NoDataComponent?: JSX.Element
}

const Tab = createMaterialTopTabNavigator()
const TopTabs = <T,>(props: Props<T>) => {
  const { tabs, render } = props
  const { tabBackgroundColor, tabIndicatorColor, t } = useTopTabs()
  return (
    <View bgColor={'white'} flex={1}>
      {!tabs.length && (
        <EmptyListRoot>
          <Text color={'darkText'}>{t('tabs.no_data')?.toString()}</Text>
        </EmptyListRoot>
      )}
      {!!tabs.length && (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'white',
            tabBarScrollEnabled: tabs.length > 4,
            tabBarStyle: { backgroundColor: tabBackgroundColor },
            tabBarIndicatorStyle: { backgroundColor: tabIndicatorColor, height: 4 },
            tabBarItemStyle: {},
            lazy: true,
            lazyPlaceholder: () => <Loading full />
          }}
        >
          {tabs.map((tab) => (
            <Tab.Screen key={tab.id} name={tab.id} options={{ title: tab.title }}>
              {() => <Suspense fallback={null}>{render(tab.data, tab.id)}</Suspense>}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      )}
    </View>
  )
}

export default TopTabs
