import React, { useEffect, useRef, useState } from 'react'
import { View, Box, Center, Modal, Slide, Text, Spacer } from 'native-base'
import { Dimensions } from 'react-native'
import LottieView from 'lottie-react-native'
import animation from '../../assets/animations/swipe-animation2.json'
import { eventHeaderHeight } from '../../themes/darkTheme'
import useAnimatedModal from './useAnimatedModal'

export interface AnimatedModalProps {
  itemHeight: number
  index: number
  hasTabs?: boolean
}

const AnimatedModal: React.FC<AnimatedModalProps> = (props) => {
  const { overlayColor, topSlide, itemHeight, showOverlay } = useAnimatedModal(props)

  return (
    <Slide in={showOverlay} placement="top">
      <Box position={'absolute'} top={0} left={0} right={0} bottom={0}>
        <View bg={overlayColor} height={topSlide} />
        <Center w={'100%'}>
          <LottieView style={{ height: itemHeight }} source={animation} autoPlay loop />
        </Center>
        <Spacer bg={overlayColor} />
      </Box>
    </Slide>
  )
}

export default AnimatedModal
