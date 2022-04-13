import notifee from '@notifee/react-native'
import Config from './Config'
import EventHelpers from './eventHelper'

interface NotificationProps {
  title: string
  body: string
  color?: string
  largeIcon: string
}

const displayNotification = async (noti: NotificationProps) => {
  const { title, body, color, largeIcon } = noti

  const channelId = await notifee.createChannel({
    id: Config.APP_NAME,
    name: EventHelpers.getTitle()
  })

  await notifee.displayNotification({
    title,
    body,
    android: {
      smallIcon: 'ic_notification',
      channelId,
      color: color || EventHelpers.getPrimaryColor(Config.APP_NAME),
      pressAction: { id: 'default' },
      largeIcon
    }
  })
}

const Notifications = {
  displayNotification
}

export default Notifications
