import React from 'react'
import { HStack, Pressable, Text, VStack } from 'native-base'
import { useT } from '../translations'
import MaterialIcon from './MaterialIcon'

interface Props {
  onDeleteRow: () => void
}

const SwipeRemoveItem: React.FC<Props> = (props) => {
  const t = useT()
  const { onDeleteRow } = props
  return (
    <HStack flex="1" justifyContent="flex-end" pl="2">
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={onDeleteRow}
        _pressed={{ opacity: 0.5 }}
      >
        <VStack alignItems="center" space={2}>
          <MaterialIcon name="delete" color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            {t('notifications.delete')?.toString()}
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  )
}

export default SwipeRemoveItem
