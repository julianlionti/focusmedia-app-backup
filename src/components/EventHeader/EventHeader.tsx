import styled from '@emotion/native'
import { Box, Button, Divider, HStack, IconButton, Menu, StatusBar, View } from 'native-base'
import React from 'react'
import { eventHeaderHeight } from '../../themes/darkTheme'
import CustomModal from '../CustomModal/CustomModal'
import MaterialIcon from '../MaterialIcon'
import useEventHeader from './useEventHeader'

const EventImage = styled.Image<{ eventHeaderHeight: number }>`
  height: ${() => `${eventHeaderHeight}px`};
  padding: 10px;
  width: 90%;
`

interface Props {
  canGoBack?: boolean
  setFavorite?: () => void
  isFavorite?: boolean
  loading?: boolean
  goBack?: () => void
}

const EventHeader: React.FC<Props> = (props) => {
  const { canGoBack, setFavorite, isFavorite, loading } = props
  const {
    t,
    colors,
    logoUrl,
    cleanEvent,
    openDrawer,
    goBack,
    changeEventConfirmation,
    toggleEventConfirmation,
    goToLogin,
    isLogged,
    onLogout
  } = useEventHeader()
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.gray[800]} />
      <Box safeAreaTop bg={colors.gray[400]} />
      <HStack bg="gray.700" px="1" zIndex={50} justifyContent="space-between" alignItems="center">
        <HStack alignItems="center">
          <IconButton
            disabled={loading}
            onPress={props.goBack ? props.goBack : canGoBack ? goBack : openDrawer}
            icon={
              <MaterialIcon
                size="sm"
                name={props.goBack || canGoBack ? 'arrow-back' : 'menu'}
                color="white"
              />
            }
          />
          <View flex={1} alignItems={'center'} background={'transparent'}>
            <EventImage
              eventHeaderHeight={eventHeaderHeight}
              resizeMode="contain"
              source={{ uri: logoUrl }}
            />
          </View>
          {setFavorite && (
            <IconButton onPress={setFavorite} disabled={loading}>
              <MaterialIcon name={`star${isFavorite ? '' : '-border'}`} size="sm" color="white" />
            </IconButton>
          )}
          {!canGoBack && (
            <Menu
              placement="left top"
              trigger={(triggerProps) => (
                <IconButton {...triggerProps}>
                  <MaterialIcon disabled={loading} name="more-vert" size="sm" color="white" />
                </IconButton>
              )}
            >
              <Menu.Item onPress={toggleEventConfirmation}>
                {t('header.change_event') as string}
              </Menu.Item>
              <Menu.Item onPress={isLogged ? onLogout : goToLogin}>
                {t(isLogged ? 'header.logout' : 'header.login') as string}
              </Menu.Item>
              {isLogged && (
                <Menu.Item onPress={goToLogin}>{t('header.gotoonetoone') as string}</Menu.Item>
              )}
            </Menu>
          )}
        </HStack>
      </HStack>
      <Divider />
      <CustomModal
        isOpen={changeEventConfirmation}
        onClose={toggleEventConfirmation}
        title={t('header.change_event_title')}
        description={t('header.change_event_description')}
        actionBtn={<Button onPress={cleanEvent}>{t('yes')?.toString()}</Button>}
      />
    </>
  )
}

export default EventHeader
