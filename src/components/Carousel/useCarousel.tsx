import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import useSelectedEvent from '../../hooks/useSelectedEvent'

const timeLapse = 10000
const useCarousel = () => {
  const flatListRef = useRef<FlatList<string> | null>(null)
  const [page, setPage] = useState(0)
  const interval = useRef<NodeJS.Timer>()
  const { images } = useSelectedEvent()
  const [restart, setRestart] = useState(false)
  const { color } = useSelectedEvent()

  useEffect(() => {
    if (interval.current) clearInterval(interval.current)
    interval.current = setInterval(() => {
      setPage((act) => {
        if (act === images.length - 1) return 0
        return act + 1
      })
    }, timeLapse)
    return () => {
      if (interval.current) {
        clearInterval(interval.current)
      }
    }
  }, [images, restart])

  useEffect(() => {
    if (!flatListRef.current) throw Error('No ref set to flatlist')
    flatListRef.current.scrollToIndex({ index: page, animated: true })
  }, [page])

  const onScrollList = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset
    const viewSize = e.nativeEvent.layoutMeasurement
    const pageNum = Math.floor(Math.floor(contentOffset.x) / Math.floor(viewSize.width))
    setPage(pageNum)
    setRestart((e) => !e)
  }, [])

  const changePage = useCallback((pageNumber: number) => {
    setPage(pageNumber)
    setRestart((e) => !e)
  }, [])

  return { images, page, ref: flatListRef, onScrollList, changePage, color }
}

export default useCarousel
