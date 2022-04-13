import React from 'react'
import useMaps from './useMaps'
import MapViewer from '../../components/MapViewer'
import TopTabs from '../../components/TopTabs/TopTabs'
import PageContainer from '../../components/PageContainer'
import EventHeader from '../../components/EventHeader/EventHeader'
import HasToUpdate from '../../components/HasToUpdate/HasToUpdate'

const Maps = () => {
  const { tabs } = useMaps()
  return (
    <PageContainer>
      <EventHeader />
      <TopTabs
        tabs={tabs}
        render={(map) => (
          <>
            <HasToUpdate />
            <MapViewer {...map} />
          </>
        )}
      />
    </PageContainer>
  )
}

export default Maps
