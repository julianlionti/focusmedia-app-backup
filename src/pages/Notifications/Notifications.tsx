import React from 'react'
import { Button, Divider, Fab, FlatList, Pressable, Text, View } from 'native-base'
import useNotifications from './useNotifications'
import PageContainer from '../../components/PageContainer'
import EventHeader from '../../components/EventHeader/EventHeader'
import HasToUpdate from '../../components/HasToUpdate/HasToUpdate'
import NotificationItem from '../../components/NotificationItem'
import EmptyListRoot from '../../components/EmptyListRoot'
import MaterialIcon from '../../components/MaterialIcon'
import CustomModal from '../../components/CustomModal/CustomModal'
import { SwipeListView } from 'react-native-swipe-list-view'
import SwipeRemoveItem from '../../components/SwipeRemoveItem'
import AnimatedModal from '../../components/AnimatedModal/AnimatedModal'

const Notifications = () => {
  const {
    t,
    notifications,
    openConfirmationAll,
    toggleConfirmation,
    cleanNotifications,
    removeNotification,
    randomIndex
  } = useNotifications()
  return (
    <PageContainer bgColor={'white'}>
      <EventHeader />
      <HasToUpdate />
      {notifications.length === 0 && (
        <EmptyListRoot>
          <Text color="darkText">{t('notifications.no_data')}</Text>
        </EmptyListRoot>
      )}
      <SwipeListView
        ItemSeparatorComponent={() => <Divider />}
        data={notifications}
        renderItem={({ item }) => <NotificationItem {...item} />}
        renderHiddenItem={({ item }) => (
          <SwipeRemoveItem onDeleteRow={() => removeNotification(item)} />
        )}
        rightOpenValue={-70}
      />
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        onPress={toggleConfirmation}
        icon={<MaterialIcon color="white" name="delete" size="sm" />}
      />
      <CustomModal
        title={t('notifications.delete_all_confirmation_title')}
        description={t('notifications.delete_all_confirmation_description')}
        isOpen={openConfirmationAll}
        onClose={toggleConfirmation}
        actionBtn={<Button onPress={cleanNotifications}>{t('yes')}</Button>}
      />
      {/* <AnimatedModal itemHeight={100} index={randomIndex} /> */}
    </PageContainer>
  )
}

export default Notifications
