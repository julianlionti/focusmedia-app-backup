import { useEventsState } from '../reducers/eventsReducer'

const useSelectedEvent = () => {
  const { selectedEvent } = useEventsState()
  if (!selectedEvent) {
    throw Error('No selected event, Must select one again')
  }
  return selectedEvent
}

export default useSelectedEvent
