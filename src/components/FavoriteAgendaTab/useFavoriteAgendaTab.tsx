import React, { useMemo } from 'react'
import { useTheme } from 'native-base'
import { useCallback, useState } from 'react'
import { FloatingAction, IActionProps } from 'react-native-floating-action'
import { emptyFavorites } from '../../actions/eventsActions'
import { useAppDispatch } from '../../hooks/redux'
import { FabActions } from '../../pages/OneToOneAgenda/useOneToOneAgenda'
import { FavoriteAgendaType, useEventsState } from '../../reducers/eventsReducer'
import { useT } from '../../translations'
import MaterialIcon from '../MaterialIcon'
import { useNavigation } from '@react-navigation/native'
import { OneToOneAgendaParamList } from '../../routes/OneToOneAgendaStack'
import { StackNavigationProp } from '@react-navigation/stack'

type Navigation = StackNavigationProp<OneToOneAgendaParamList>
const useFavoriteAgendaTab = () => {
  const { favoriteAgenda, ownEvents } = useEventsState()
  const dispatch = useAppDispatch()
  const t = useT()
  const { colors } = useTheme()
  const [showDelete, setShowDelete] = useState(false)
  const navigation = useNavigation<Navigation>()

  const initialAgendaSection: {
    date: string | undefined
    day: number
    data: FavoriteAgendaType[]
  }[] = []

  const sections = [...ownEvents, ...favoriteAgenda].reduce((acc, it) => {
    const exists = acc.find((fav) => fav.date === it.date)
    if (exists) {
      exists.data = [...exists.data, it].sort(
        (a, b) => parseInt(a.beginning || '0', 10) - parseInt(b.beginning || '0', 10)
      )
      return acc
    }

    return [...acc, { date: it.date, day: it.day, data: [it] }]
  }, initialAgendaSection)

  const fabColor = colors.primary[600]
  const fabActionsColor = colors.primary[700]
  const fabActions = useMemo(
    () =>
      [
        sections.length > 0 && {
          color: fabActionsColor,
          icon: <MaterialIcon name="delete" />,
          name: 'Delete' as FabActions,
          text: t('onetoone.delete_all') as string
        },
        {
          color: fabActionsColor,
          icon: <MaterialIcon name="add" />,
          name: 'Create' as FabActions,
          text: t('onetoone.create_event') as string
        }
      ].filter((e) => e) as IActionProps[],
    [sections, fabActionsColor, t]
  )

  const openCreate = useCallback(() => {
    navigation.push('CreateEvent')
  }, [navigation])

  const onCloseDelete = () => setShowDelete(false)
  const onPressFab = useCallback(
    (item: FabActions) => {
      switch (item) {
        case 'Create':
          openCreate()
          break
        case 'Delete':
          setShowDelete(true)
          break
      }
    },
    [openCreate]
  )

  const onAcceptDelete = () => {
    dispatch(emptyFavorites('Agenda'))
    onCloseDelete()
  }

  const Fab = useMemo(
    () => (
      <FloatingAction
        color={fabColor}
        actions={fabActions}
        onPressItem={(item) => onPressFab(item as FabActions)}
      />
    ),
    [fabActions, fabColor, onPressFab]
  )

  return {
    t,
    sections: sections,
    showDelete,
    onCloseDelete,
    onAcceptDelete,
    Fab,
    openCreate
  }
}

export default useFavoriteAgendaTab
