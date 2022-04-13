import { useNavigation } from '@react-navigation/native'
import { useCallback, useMemo, useState } from 'react'
import { deleteOwnEvent, setAgendaItemFavorite } from '../../actions/eventsActions'
import { useAppDispatch } from '../../hooks/redux'
import useSelectedEvent from '../../hooks/useSelectedEvent'
import { useEventsState } from '../../reducers/eventsReducer'
import { useT } from '../../translations'
import { AgendaActivityItemProps } from './AgendaActivityItem'

const useAgendaActivityItem = (props: AgendaActivityItemProps) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [favConfirmation, setFavConfirmation] = useState(false)
  const t = useT()
  const dispatch = useAppDispatch()
  const { color } = useSelectedEvent()
  const { favoriteAgenda } = useEventsState()
  const { details, idActivity, isFromFav, isOwn } = props
  const hasDetail = !!details.length
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>()

  const openDetail = useCallback(() => {
    if (isFromFav) {
      navigation.push('AgendaDetail', details)
    } else {
      navigation.push('Detail', details)
    }
  }, [navigation, details, isFromFav])

  const pressDelete = () => {
    setDeleteConfirmation(true)
  }

  const closeDeleteDlg = () => {
    setDeleteConfirmation(false)
  }

  const pressFavorite = () => {
    if (isFavorite) {
      setFavConfirmation(true)
    } else {
      setFavorite()
    }
  }

  const closeFavDlg = () => {
    setFavConfirmation(false)
  }

  const setFavorite = useCallback(() => {
    dispatch(setAgendaItemFavorite(props))
    closeFavDlg()
  }, [dispatch, props])

  const isFavorite = useMemo(
    () => favoriteAgenda.some((fa) => fa.idActivity === idActivity),
    [favoriteAgenda, idActivity]
  )

  const removeOwn = useCallback(() => {
    dispatch(deleteOwnEvent(props))
  }, [dispatch, props])

  return {
    ...props,
    color,
    t,
    hasDetail,
    openDetail,
    setFavorite,
    isFavorite,
    isOwn,
    removeOwn,
    closeDeleteDlg,
    deleteConfirmation,
    pressDelete,
    favConfirmation,
    pressFavorite,
    closeFavDlg
  }
}

export default useAgendaActivityItem
