import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { checkForUpdates } from '../../actions/eventsActions'
import { useAppDispatch } from '../../hooks/redux'
import useSelectedEvent from '../../hooks/useSelectedEvent'
import { useEventsState } from '../../reducers/eventsReducer'
import { useT } from '../../translations'

const useEventHome = () => {
  const t = useT()
  const { navigate } = useNavigation<any>()
  const dispatch = useAppDispatch()
  const { alreadyShownAds } = useEventsState()
  const { color, place, date, name, adveryisments } = useSelectedEvent()

  // useEffect(() => {
  //   const selectedAd = adveryisments[Math.floor(Math.random() * adveryisments.length)]
  //   if (!alreadyShownAds && selectedAd) {
  //     navigate('AdModal', selectedAd)
  //   }
  // }, [alreadyShownAds, navigate, adveryisments])

  useEffect(() => {
    dispatch(checkForUpdates())
  }, [dispatch, color])

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return {
    t,
    color,
    place,
    date,
    name
  }
}

export default useEventHome
