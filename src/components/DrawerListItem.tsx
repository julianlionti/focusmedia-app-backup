import React from 'react'
import { IMenu } from './DrawerContent/useDrawerContent'
import { HStack, Icon, Pressable, Text, useContrastText } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import useSelectedEvent from '../hooks/useSelectedEvent'

interface Props extends IMenu {
  selected?: boolean
}

const DrawerListItem: React.FC<Props> = (props) => {
  const { onPress, title, icon, selected } = props
  const contrastColor = useContrastText('white')
  const { color } = useSelectedEvent()
  return (
    <Pressable onPress={onPress}>
      <HStack space="2" alignItems={'center'} mx="2" py="1.5">
        <Icon as={MaterialIcons} name={icon} color={'gray.700'} />
        <Text
          fontWeight={selected ? 'bold' : 'normal'}
          py="1"
          color={selected ? color : contrastColor}
          flex={1}
        >
          {title}
        </Text>
        <Icon as={MaterialIcons} name={'chevron-right'} color={'gray.700'} />
      </HStack>
    </Pressable>
  )
}

export default DrawerListItem
