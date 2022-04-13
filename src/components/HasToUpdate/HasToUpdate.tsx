import { Alert, Box, Button, HStack, PresenceTransition, Text, VStack } from 'native-base'
import React from 'react'
import useHasToUpdate from './useHasToUpdate'

const HasToUpdate = () => {
  const { t, showHasToUpdate, onUpdatePress } = useHasToUpdate()
  if (!showHasToUpdate) return null
  return (
    <PresenceTransition
      visible={showHasToUpdate}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 250 } }}
    >
      <Box alignItems={'center'} py={2}>
        <Alert w="90%" maxW="400" status="warning">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                  {t('home.has_to_update_title')?.toString()}
                </Text>
              </HStack>
            </HStack>
            <Box pl="6" _text={{ color: 'coolGray.600' }}>
              {t('home.has_to_update')}
            </Box>
            <Button onPress={onUpdatePress} variant={'subtle'} colorScheme="warning">
              {t('home.has_to_update_button')?.toUpperCase()}
            </Button>
          </VStack>
        </Alert>
      </Box>
    </PresenceTransition>
  )
}

export default HasToUpdate
