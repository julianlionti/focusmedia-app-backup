import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { cleanAllNotifications, setNotification } from '../../actions/userActions'
import { INotification } from '../../models/INotification'
import { useUserState } from '../../reducers/userReducer'
import { useT } from '../../translations'

const useNotifications = () => {
  const dispatch = useDispatch()
  const t = useT()
  const [openConfirmationAll, setOpenConfirmationAll] = useState(false)
  const { notifications } = useUserState()

  const toggleConfirmation = () => {
    setOpenConfirmationAll((e) => !e)
  }

  const cleanNotifications = () => {
    dispatch(cleanAllNotifications())
    setOpenConfirmationAll(false)
  }

  const removeNotification = (noti: INotification) => {
    dispatch(setNotification(noti))
  }

  const randomIndex = Math.floor(Math.random() * notifications.length)

  return {
    t,
    notifications,
    openConfirmationAll,
    toggleConfirmation,
    cleanNotifications,
    removeNotification,
    randomIndex
  }
}

export default useNotifications
