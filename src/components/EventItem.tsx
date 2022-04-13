import styled from '@emotion/native'
import { Pressable, VStack } from 'native-base'
import React, { memo } from 'react'
import { IEvent } from '../models/IEvent'
import Config from '../utils/Config'

interface Props extends IEvent {
  onPress: (event: IEvent) => void
}

const EventImage = styled.Image`
  width: 90%;
  height: 150px;
`

const EventItem = memo<Props>((props) => {
  const { onPress, ...event } = props
  const { image } = event
  return (
    <Pressable onPress={() => onPress(event)}>
      <VStack alignItems={'center'}>
        <EventImage
          resizeMode="contain"
          source={{ uri: `${Config.BASE_URL.slice(0, -1)}${image}` }}
        />
      </VStack>
    </Pressable>
  )
})

export default EventItem
