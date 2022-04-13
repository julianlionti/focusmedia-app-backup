import { useNavigation, useRoute } from '@react-navigation/native'
import { useCallback } from 'react'
import { Linking } from 'react-native'
import { setAlreadyShownAds } from '../../actions/eventsActions'
import { useAppDispatch } from '../../hooks/redux'
import { IAd } from '../../models/IFullEvent'
import { useT } from '../../translations'

export const useAdModal = () => {
  const t = useT()
  const dispatch = useAppDispatch()
  const { params } = useRoute()
  const { link, vertical } = params as IAd
  const { goBack } = useNavigation()

  const openAd = useCallback(async () => {
    let finalLink = link
    if (!link.includes('http')) finalLink = 'http://' + link
    if (finalLink) {
      const canOpen = await Linking.canOpenURL(finalLink)
      if (canOpen) {
        Linking.openURL(finalLink)
      }
    }
    dispatch(setAlreadyShownAds(true))
    goBack()
  }, [link, goBack, dispatch])

  const closeAd = useCallback(() => {
    dispatch(setAlreadyShownAds(true))
    goBack()
  }, [goBack, dispatch])

  return { t, image: vertical, link, openAd, closeAd }
}
