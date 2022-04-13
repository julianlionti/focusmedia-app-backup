import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'native-base'
import { useState } from 'react'
import { cleanSelectedEvent } from '../../actions/eventsActions'
import { logout } from '../../actions/userActions'
import { useAppDispatch } from '../../hooks/redux'
import useSelectedEvent from '../../hooks/useSelectedEvent'
import { useUserState } from '../../reducers/userReducer'
import { useT } from '../../translations'

const useEventHeader = () => {
  const [changeEventConfirmation, setChangeEventConfirmation] = useState(false)
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { openDrawer, goBack, navigate } = useNavigation<any>()
  const { logo } = useSelectedEvent()
  const t = useT()
  const { username } = useUserState()

  const cleanEvent = () => {
    dispatch(cleanSelectedEvent())
    dispatch(logout())
    toggleEventConfirmation()
  }

  const goToLogin = () => {
    navigate('OneToOneAgenda', {
      screen: 'Tabs',
      params: {
        screen: 'onetoone.online_access'
      }
    })
  }

  const toggleEventConfirmation = () => setChangeEventConfirmation((e) => !e)

  const onLogout = () => {
    dispatch(logout())
  }

  return {
    t,
    colors,
    openDrawer,
    logoUrl: logo,
    cleanEvent,
    goBack,
    toggleEventConfirmation,
    changeEventConfirmation,
    goToLogin,
    isLogged: !!username,
    onLogout
  }
}
export default useEventHeader
