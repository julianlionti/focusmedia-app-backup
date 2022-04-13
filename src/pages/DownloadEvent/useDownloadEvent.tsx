import { RouteProp, useRoute } from '@react-navigation/native'
import { useTheme, useToast } from 'native-base'
import { useEffect } from 'react'
import { downloadEvent } from '../../actions/eventsActions'
import { removeError } from '../../actions/loadingActions'
import { useAppDispatch } from '../../hooks/redux'
import { useEventsState } from '../../reducers/eventsReducer'
import { useLoadingState } from '../../reducers/loadingReducer'
import { NoEventStackParamList } from '../../routes/NoEventStack'
import { useT } from '../../translations'

type RouteProps = RouteProp<NoEventStackParamList, 'DownloadEvent'>
const useDownloadEvent = () => {
  const dispatch = useAppDispatch()
  const { show, isActive } = useToast()
  const { params } = useRoute<RouteProps>()
  const { progress, isDownloading, isUnzipping, selectedEvent } = useEventsState()
  const { errors } = useLoadingState()
  const { colors } = useTheme()

  const t = useT()
  const { event } = params || {}
  const finalEvent = event || selectedEvent
  const { unziping } = errors
  const { id, lang } = finalEvent

  useEffect(() => {
    dispatch(downloadEvent({ id, lang }))
  }, [dispatch, id, lang])

  useEffect(() => {
    if (unziping) {
      const errorKey = 'unziping'
      if (!isActive(errorKey))
        show({
          title: t('download.unzipping_error'),
          id: errorKey,
          variant: 'solid',
          status: 'error'
        })
      dispatch(removeError({ key: errorKey }))
    }
  }, [isActive, dispatch, show, unziping, t])

  const percentage = (progress.loaded * 1) / progress.total
  const downloadColor = colors.primary[500]
  const unzippingColor = colors.orange[500]

  return {
    event: finalEvent,
    t,
    isDownloading,
    isUnzipping,
    percentage: isNaN(percentage) ? 0 : percentage,
    downloadColor,
    unzippingColor
  }
}

export default useDownloadEvent
