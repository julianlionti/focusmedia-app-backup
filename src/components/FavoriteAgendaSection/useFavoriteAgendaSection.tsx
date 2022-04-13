import { useTheme } from 'native-base'
import useSelectedEvent from '../../hooks/useSelectedEvent'
import { SectionFavoriteType } from '../../reducers/eventsReducer'
import { useT } from '../../translations'

const useFavoriteAgendaSection = (props: SectionFavoriteType) => {
  const { date, day } = props
  const { color } = useSelectedEvent()
  const { colors } = useTheme()
  const contrastColor = colors.lightText
  const t = useT()
  const title = `${t('agenda.day')} ${day}${date ? ` - ${date}` : ''}`
  return { color, contrastColor, title }
}

export default useFavoriteAgendaSection
