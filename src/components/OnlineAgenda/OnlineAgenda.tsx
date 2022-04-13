import React from 'react'
import { Divider, Heading, SectionList, Text } from 'native-base'
import PageContainer from '../PageContainer'
import useOnlineAgenda from './useOnlineAgenda'
import OnlineAgendaItem from '../OnlineAgendaItem'
import FavoriteAgendaSection from '../FavoriteAgendaSection/FavoriteAgendaSection'
import { RefreshControl } from 'react-native'
import EmptyListRoot from '../EmptyListRoot'

const OnlineAgenda = () => {
  const { t, agenda, isLoading, refreshItems } = useOnlineAgenda()

  if (agenda.length === 0)
    return (
      <EmptyListRoot>
        <Heading textAlign={'center'} color={'darkText'}>
          {t('onetoone.empty_onetoone_agenda')?.toString()}
        </Heading>
      </EmptyListRoot>
    )

  return (
    <PageContainer bgColor={isLoading ? undefined : 'white'}>
      <SectionList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refreshItems} />}
        renderSectionHeader={({ section: { eventDay } }) => (
          <FavoriteAgendaSection day={eventDay} />
        )}
        SectionSeparatorComponent={() => <Divider />}
        sections={agenda}
        renderItem={({ item }) => <OnlineAgendaItem {...item} />}
      />
    </PageContainer>
  )
}

export default OnlineAgenda
