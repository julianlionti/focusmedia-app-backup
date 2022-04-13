import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { useMemo, useState } from 'react'
import { Linking } from 'react-native'
import useSelectedEvent from '../../hooks/useSelectedEvent'
import { EventDrawerParamList } from '../../routes/EventDrawer'
import { Translations, useT } from '../../translations'

type NavigationProps = DrawerNavigationProp<EventDrawerParamList>
type Screens = keyof EventDrawerParamList
export type IMenu = { title: string; icon: string; onPress: () => void; screen: Screens }

const useDrawerContent = () => {
  const t = useT()
  const [selected, setSelected] = useState<Screens>('Home')
  const navigator = useNavigation<NavigationProps>()
  const { menu, oneToOneAgendaUrl } = useSelectedEvent()
  const { address, contact, socialNetworks } = menu

  const menuOptions = useMemo<IMenu[]>(() => {
    const createMenuItem = (
      tkey: Translations,
      icon: string,
      screen: Screens,
      onPress?: () => void
    ) => ({
      icon,
      screen,
      title: t(tkey) as string,
      onPress: () => {
        if (!onPress) {
          setSelected(screen)
          navigator.navigate(screen)
        } else {
          onPress()
        }
      }
    })

    return [
      createMenuItem('menu.home', 'home', 'Home'),
      createMenuItem('menu.welcome', 'info', 'Welcome'),
      createMenuItem('menu.maps', 'place', 'Maps'),
      createMenuItem('menu.general_agenda', 'calendar-today', 'GeneralAgenda'),
      createMenuItem('menu.online_agenda', 'web', 'OnlineAgenda', async () => {
        const canOpen = await Linking.canOpenURL(oneToOneAgendaUrl)
        if (canOpen) Linking.openURL(oneToOneAgendaUrl)
      }),
      createMenuItem('menu.one_to_one_agenda', 'person-pin', 'OneToOneAgenda'),
      createMenuItem('menu.featured', 'featured-play-list', 'Featured'),
      createMenuItem('menu.catalogue', 'local-library', 'CatalogueStack'),
      createMenuItem('menu.notifications', 'notifications', 'Notifications')
    ]
  }, [navigator, t, oneToOneAgendaUrl])

  return { t, menuOptions, address, contact, socialNetworks, selected }
}

export default useDrawerContent
