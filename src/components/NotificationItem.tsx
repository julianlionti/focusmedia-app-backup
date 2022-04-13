import React from 'react'
import { Center, Heading, Text, VStack } from 'native-base'
import { INotification } from '../models/INotification'

const NotificationItem: React.FC<INotification> = (props) => {
  const { message, title, date } = props
  return (
    <Center bgColor={'white'} height={'100px'} p={2} flexDirection={'row'}>
      <VStack flex={1} space={2}>
        <Heading color="darkText" size={'sm'}>
          {title}
        </Heading>
        <Text color="darkText">{message}</Text>
      </VStack>
      <Text color="darkText">{date}</Text>
    </Center>
  )
}

export default NotificationItem
