import { HStack, Icon, Image, Pressable, Text } from 'native-base'
import React from 'react'
import normalize from 'react-native-normalize'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ICatalogue } from '../../models/IFullEvent'

interface Props extends ICatalogue {
  onPress?: () => void
}

const CatalogueItem: React.FC<Props> = (props) => {
  const { name, logo, onPress } = props
  return (
    <Pressable onPress={onPress}>
      <HStack alignItems={'center'} space={2} mr={4}>
        <Image
          alignItems={'center'}
          height={normalize(70, 'height')}
          width={normalize(120, 'width')}
          m={1}
          resizeMode="contain"
          source={logo ? { uri: logo } : undefined}
          alt={`Image from catalogue for brand ${name}`}
        />
        <Text color="darkText" flex={1}>
          {name}
        </Text>
        <Icon as={MaterialIcons} name={'chevron-right'} color={'gray.700'} />
      </HStack>
    </Pressable>
  )
}

export default CatalogueItem
