import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import Notifications from '../../utils/notifications'
import EventHelpers from '../../utils/eventHelper'
import Config from '../../utils/Config'
import { useEventsState } from '../../reducers/eventsReducer'
import { useAppDispatch } from '../../hooks/redux'
import { setNotification } from '../../actions/userActions'
import moment from 'moment'

const useMain = () => {
  const { selectedEvent, hasToUpdate } = useEventsState()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async ({ data, sentTime, messageId }) => {
      const { titulo, mensaje } = data as any
      if (!messageId) return
      if (!selectedEvent) return

      dispatch(
        setNotification({
          title: titulo,
          message: mensaje,
          id: messageId,
          date: moment(sentTime).format('DD/MM HH:mm')
        })
      )
      Notifications.displayNotification({
        title: titulo,
        body: mensaje,
        color: selectedEvent.color,
        largeIcon: selectedEvent.logo
      })
    })

    return unsubscribe
  }, [dispatch, selectedEvent])

  return { selectedEvent, hasToUpdate }
}

export default useMain
