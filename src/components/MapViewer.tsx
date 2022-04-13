import React from 'react'
import PageContainer from './PageContainer'
import { IMap } from '../models/IFullEvent'
import ImageZoom from 'react-native-image-pan-zoom'
import { Dimensions } from 'react-native'
import normalize from 'react-native-normalize'
import { Image } from 'native-base'

type Props = IMap
const MapViewer: React.FC<Props> = (props) => {
  const { image, name } = props

  const imageSize = normalize(350)

  return (
    <PageContainer bgColor={'white'}>
      <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageHeight={imageSize}
        imageWidth={imageSize}
      >
        <Image
          alt={image}
          resizeMode="contain"
          w={imageSize}
          h={imageSize}
          source={{ uri: image }}
        />
      </ImageZoom>
    </PageContainer>
  )
}

export default MapViewer
