import React from 'react'
import { FlatList } from 'native-base'
import PageContainer from '../../components/PageContainer'
import EventHeader from '../../components/EventHeader/EventHeader'
import useAgeDetail from './useAgeDetail'
import AgendaDetailItem from '../../components/AgendaDetailItem'
import HasToUpdate from '../../components/HasToUpdate/HasToUpdate'

const AgendaDetail = () => {
  const { data } = useAgeDetail()
  return (
    <PageContainer bgColor={'white'}>
      <EventHeader canGoBack />
      <HasToUpdate />
      <FlatList
        keyExtractor={(item) => item.idDetail.toString()}
        data={data}
        renderItem={({ item }) => <AgendaDetailItem {...item} />}
      />
    </PageContainer>
  )
}

export default AgendaDetail
