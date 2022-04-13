import { ITab } from '../../components/TopTabs/TopTabs'
import useSelectedEvent from '../../hooks/useSelectedEvent'

const useFeatured = () => {
  const { featured } = useSelectedEvent()
  const tabs = featured.map(
    (m): ITab<typeof m> => ({
      data: m,
      id: m.id.toString(),
      title: m.name.replace(/\.[^.]*$/, '')
    })
  )
  return { tabs }
}

export default useFeatured
