import React from 'react'
import EventHeader from '../../components/EventHeader/EventHeader'
import PageContainer from '../../components/PageContainer'
import useOneToOneAgenda, { OneToOneTabs } from './useOneToOneAgenda'
import TopTabs from '../../components/TopTabs/TopTabs'

const OneToOneAgenda = () => {
  const { tabs, renderTab } = useOneToOneAgenda()

  return (
    <PageContainer>
      <EventHeader />
      <TopTabs tabs={tabs} render={(_, id) => renderTab(id as OneToOneTabs)} />
    </PageContainer>
  )
}

export default OneToOneAgenda
