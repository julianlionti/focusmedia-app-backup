import styled from '@emotion/native'
import { Center, HStack, Icon } from 'native-base'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface Props {
  list: string[]
  actualPage: number
  onPress: (index: number) => void
}

const DotsRoot = styled.View`
  bottom: 8px;
  left: 0;
  right: 0;
  position: absolute;
`

const DotCounter: React.FC<Props> = ({ list, onPress, actualPage }) => (
  <DotsRoot>
    <Center>
      <HStack space="2">
        {list.map((row, i) => (
          <Icon
            onPress={() => onPress(i)}
            size="xs"
            key={row}
            as={MaterialIcons}
            name={`radio-button-${i === actualPage ? 'on' : 'off'}`}
          />
        ))}
      </HStack>
    </Center>
  </DotsRoot>
)

export default DotCounter
