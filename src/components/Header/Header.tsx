import { Box, HStack, StatusBar, Text, useTheme } from 'native-base'
import React from 'react'
import EventHelpers from '../../utils/eventHelper'

const Header = () => {
  const { colors } = useTheme()
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.gray[800]} />
      <Box safeAreaTop bg={colors.gray[400]} />
      <HStack bg="gray.500" px="1" py="3" justifyContent="space-between" alignItems="center">
        <HStack alignItems="center">
          <Text p="1" color="white" fontSize="20" fontWeight="bold">
            {EventHelpers.getTitle()}
          </Text>
        </HStack>
      </HStack>
    </>
  )
}

export default Header
