import React from 'react'
import { Avatar, Text, VStack } from 'native-base'
import { IParticipant } from '../models/IFullEvent'
import ManIcon from '../assets/icons/man.svg'
import WomanIcon from '../assets/icons/woman.svg'

const ParticipantsItem: React.FC<IParticipant> = (props) => {
  const { name, photo, position, surname, gender } = props
  return (
    <VStack alignItems={'center'} width={'50%'} py="2">
      <Avatar source={photo ? { uri: photo } : undefined} size={'32'} my="2">
        {gender === 'm' && !photo ? <ManIcon /> : <WomanIcon />}
      </Avatar>
      <Text color="darkText" fontWeight={'bold'}>{`${name} ${surname}`}</Text>
      <Text color="darkText">{position}</Text>
    </VStack>
  )
}

export default ParticipantsItem
