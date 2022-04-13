import { ITab } from '../../components/TopTabs/TopTabs'
import useSelectedEvent from '../../hooks/useSelectedEvent'

const useMaps = () => {
  const { maps } = useSelectedEvent()
  const tabs = maps.map((m): ITab<typeof m> => ({ data: m, id: m.id.toString(), title: m.name }))

  return { tabs }
}

export default useMaps
