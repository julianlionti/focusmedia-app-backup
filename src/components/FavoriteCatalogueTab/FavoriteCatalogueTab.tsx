import React from 'react'
import { Divider, FlatList, Heading } from 'native-base'
import CatalogueItem from '../CatalogueItem/CatalogueItem'
import useFavoriteCatalogueTab from './useFavoriteCatalogueTab'
import HasToUpdate from '../HasToUpdate/HasToUpdate'
import EmptyListRoot from '../EmptyListRoot'

const FavoriteCatalogueTab = () => {
  const { t, data, openDetail, goToCatalogue, Fab } = useFavoriteCatalogueTab()

  if (!data.length) {
    return (
      <EmptyListRoot fab={Fab} onPressAdd={goToCatalogue}>
        <Heading textAlign={'center'} color={'darkText'}>
          {t('onetoone.empty_catalogue')?.toString()}
        </Heading>
      </EmptyListRoot>
    )
  }

  return (
    <>
      <HasToUpdate />
      <FlatList
        data={data}
        keyExtractor={(item) => item.idCatalogue.toString()}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => <CatalogueItem onPress={() => openDetail(item)} {...item} />}
      />
      {Fab}
    </>
  )
}

export default FavoriteCatalogueTab
