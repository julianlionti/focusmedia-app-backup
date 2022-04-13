import { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import moment from 'moment'
import { setNotification } from '../actions/userActions'
import { store } from '../store/store'
// import { store } from '../store/store'
import Config from '../utils/Config'
import EventHelpers from '../utils/eventHelper'
import { injectStore } from '../utils/makeRequest'
import Notifications from '../utils/notifications'

export const backgroundMessageHandler = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) => {
  try {
    const { data, sentTime, messageId } = remoteMessage
    const { titulo, mensaje } = data as any
    if (!messageId) return
    const { dispatch, getState } = store
    const { eventsReducer } = getState()
    const { selectedEvent } = eventsReducer
    if (!selectedEvent) return
    const { color, logo } = selectedEvent

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
      color: color,
      largeIcon: logo
    })
  } catch (err) {
    console.log(err)
  }
}
