import React, { lazy } from 'react'
import EventHeader from '../../components/EventHeader/EventHeader'
import PageContainer from '../../components/PageContainer'
import TopTabs from '../../components/TopTabs/TopTabs'
import useGeneralAgenda from './useGeneralAgenda'

const AgendaActivity = lazy(() => import('../../components/AgendaActivity/AgendaActivity'))

const GeneralAgenda = () => {
  const { tabs } = useGeneralAgenda()

  return (
    <PageContainer>
      <EventHeader />
      <TopTabs tabs={tabs} render={(agenda) => <AgendaActivity key={agenda.day} {...agenda} />} />
    </PageContainer>
  )
}

export default GeneralAgenda
