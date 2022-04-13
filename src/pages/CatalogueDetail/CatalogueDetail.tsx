import { Heading, View } from 'native-base'
import React from 'react'
import EventHeader from '../../components/EventHeader/EventHeader'
import PageContainer from '../../components/PageContainer'
import TopTabs from '../../components/TopTabs/TopTabs'
import useCatalogueDetail, { CatalogueDetialTabs } from './useCatalogueDetail'

const CatalogueDetail: React.FC = () => {
  const { name, tabs, renderTab, setFavorite, isFavorite } = useCatalogueDetail()
  return (
    <PageContainer bgColor={'white'}>
      <EventHeader canGoBack setFavorite={setFavorite} isFavorite={isFavorite} />
      <View alignItems={'center'} justifyContent={'center'} height={45}>
        <Heading isTruncated>{name}</Heading>
      </View>
      <TopTabs
        noHeader
        tabs={tabs}
        render={(tab, id) => renderTab(tab, id as CatalogueDetialTabs)}
      />
    </PageContainer>
  )
}

export default CatalogueDetail
