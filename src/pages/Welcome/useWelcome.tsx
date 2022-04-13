import useSelectedEvent from '../../hooks/useSelectedEvent'

const useWelcome = () => {
  const selectedEvent = useSelectedEvent()
  const { image, hasImage, title, welcome } = selectedEvent.welcome
  return { image, hasImage, title, welcome }
}

export default useWelcome
