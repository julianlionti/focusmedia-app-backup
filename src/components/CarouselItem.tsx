import React, { memo } from 'react'
import styled from '@emotion/native'
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
interface Props {
  image: string
}

const Root = styled.Image`
  width: ${`${width}px`};
`

const CaourselItem: React.FC<Props> = memo((props) => {
  const { image } = props
  return <Root resizeMode="cover" source={{ uri: image }} />
})

export default CaourselItem
