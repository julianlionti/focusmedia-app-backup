import { useCallback } from 'react'
import { setHasToUpdate } from '../../actions/eventsActions'
import { useAppDispatch } from '../../hooks/redux'
import { useEventsState } from '../../reducers/eventsReducer'
import { useT } from '../../translations'

const useHasToUpdate = () => {
  const dispatch = useAppDispatch()
  const t = useT()
  const { showHasToUpdate } = useEventsState()

  const onUpdatePress = useCallback(() => {
    dispatch(setHasToUpdate(true))
  }, [dispatch])

  return { t, showHasToUpdate, onUpdatePress }
}

export default useHasToUpdate
