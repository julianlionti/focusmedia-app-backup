import React, { useCallback, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ICatalogue } from '../../models/IFullEvent'
import { useEventsState } from '../../reducers/eventsReducer'
import { useT } from '../../translations'
import MaterialIcon from '../MaterialIcon'
import { Fab } from 'native-base'

const useFavoriteCatalogueTab = () => {
  const t = useT()
  const { favoriteCatalogue } = useEventsState()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { navigate } = useNavigation<any>()
  const data = favoriteCatalogue

  const openDetail = (detail: ICatalogue) => {
    navigate('CatalogueDetail', detail)
  }

  const goToCatalogue = useCallback(() => {
    navigate('CatalogueStack', { screen: 'Catalogue', params: { canGoBack: true } })
  }, [navigate])

  const Floating = useMemo(() => {
    return (
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        onPress={goToCatalogue}
        bgColor={'primary.600'}
        icon={<MaterialIcon name="add" size="sm" />}
      />
    )
  }, [goToCatalogue])

  return { t, data, openDetail, goToCatalogue, Fab: Floating }
}

export default useFavoriteCatalogueTab
