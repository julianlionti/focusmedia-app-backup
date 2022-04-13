import React from 'react'
import { Image, Text, VStack } from 'native-base'
import { IAgendaSponsor } from '../../models/IFullEvent'
import normalize from 'react-native-normalize'

const AgendaSponsorItem: React.FC<IAgendaSponsor> = (props) => {
  const { image, name } = props
  return (
    <VStack space={'2'}>
      <Text color={'darkText'}>{name}</Text>
      <Image
        height={normalize(150, 'height')}
        source={{ uri: image }}
        resizeMode="contain"
        alt={`Image from ${name}`}
      />
    </VStack>
  )
}

export default AgendaSponsorItem
