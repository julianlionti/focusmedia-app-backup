import { ITab } from '../../components/TopTabs/TopTabs'
import useSelectedEvent from '../../hooks/useSelectedEvent'
import { IAgenda } from '../../models/IFullEvent'
import { useT } from '../../translations'

const useGeneralAgenda = () => {
  const t = useT()
  const { generalAgenda } = useSelectedEvent()

  const tabs = generalAgenda
    .map(
      (gene): ITab<IAgenda> => ({
        title: `${t('agenda.day')} ${gene.day}`,
        id: gene.day.toString(),
        data: gene
      })
    )
    .sort((a, b) => a.data.day - b.data.day)

  return { generalAgenda, tabs }
}

export default useGeneralAgenda
