import React from 'react'
import useCatalogue from './useCatalogue'
import PageContainer from '../../components/PageContainer'
import { Divider, FlatList } from 'native-base'
import EventHeader from '../../components/EventHeader/EventHeader'
import CatalogueItem from '../../components/CatalogueItem/CatalogueItem'
import HasToUpdate from '../../components/HasToUpdate/HasToUpdate'

const Catalogue = () => {
  const { catalogue, openDetail, goBack } = useCatalogue()

  return (
    <PageContainer bgColor={'white'}>
      <EventHeader goBack={goBack} />
      <HasToUpdate />
      <FlatList
        data={catalogue}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => <CatalogueItem {...item} onPress={() => openDetail(item)} />}
      />
    </PageContainer>
  )
}

export default Catalogue
