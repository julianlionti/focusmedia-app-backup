import { useEffect, useState } from 'react'
import { eventHeaderHeight } from '../../themes/darkTheme'
import { AnimatedModalProps } from './AnimatedModal'

const useAnimatedModal = (props: AnimatedModalProps) => {
  const [showOverlay, setShowOverlay] = useState(true)
  const { hasTabs, itemHeight, index } = props

  const topSlide = eventHeaderHeight + index * itemHeight + 1 * index + (hasTabs ? 30 : 0)
  const overlayColor = 'coolGray.500:alpha.60'

  useEffect(() => {
    setTimeout(() => {
      setShowOverlay(true)
      setTimeout(() => {
        setShowOverlay(false)
      }, 1500)
    }, 1000)
  }, [])

  // const endAnimation = () => {
  //   setShowOverlay(false)
  // }

  return { topSlide, overlayColor, itemHeight, showOverlay }
}

export default useAnimatedModal
