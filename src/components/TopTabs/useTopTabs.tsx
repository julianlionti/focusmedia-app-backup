import { useContrastText, useTheme } from 'native-base'
import useSelectedEvent from '../../hooks/useSelectedEvent'
import { useT } from '../../translations'

const useTopTabs = () => {
  const { color } = useSelectedEvent()
  const { colors } = useTheme()
  const t = useT()

  const tabBackgroundColor = colors.gray[800]
  const constrantTextColor = useContrastText(tabBackgroundColor)

  const tabIndicatorColor = color
  return { t, tabBackgroundColor, tabIndicatorColor, constrantTextColor }
}

export default useTopTabs
