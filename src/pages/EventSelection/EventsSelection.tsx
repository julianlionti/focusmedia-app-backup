import styled from '@emotion/native'
import { Button, Divider, Heading } from 'native-base'
import React from 'react'
import { Trans } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'
import CustomModal from '../../components/CustomModal/CustomModal'
import EventItem from '../../components/EventItem'
import Header from '../../components/Header/Header'
import PageContainer from '../../components/PageContainer'
import EventHelpers from '../../utils/eventHelper'
import useEventSelection from './useEventSelection'

const Title = styled(Heading)`
  margin: 8px 0;
`

const EventsSelection = () => {
  const {
    t,
    events,
    isLoading,
    refreshEvents,
    selectEvent,
    hasToAskForNotificationPermission,
    closePermissions,
    askUserPermissions
  } = useEventSelection()
  return (
    <PageContainer>
      <Header />
      <Title textAlign="center" bold>
        <Trans i18nKey={'welcome'} values={{ event: EventHelpers.getHashedTitle() }} />
      </Title>
      <FlatList
        keyExtractor={(item) => item.name}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refreshEvents} />}
        data={events}
        ItemSeparatorComponent={() => <Divider my="2" />}
        renderItem={({ item }) => <EventItem onPress={() => selectEvent(item)} {...item} />}
      />
      <CustomModal
        actionBtn={<Button onPress={askUserPermissions}>Ok</Button>}
        description={t('notifications.permissions_description')}
        isOpen={hasToAskForNotificationPermission || false}
        onClose={closePermissions}
        title={t('notifications.permissions_title')}
      />
    </PageContainer>
  )
}

export default EventsSelection
