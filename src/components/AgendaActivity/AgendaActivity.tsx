import React from 'react'
import { Divider, FlatList } from 'native-base'
import { IAgenda } from '../../models/IFullEvent'
import AgendaActivityItem from '../AgendaActivityItem/AgendaActivityItem'
import HasToUpdate from '../HasToUpdate/HasToUpdate'

const AgendaActivity: React.FC<IAgenda> = (props) => {
  const { activities, date, day } = props
  return (
    <>
      <HasToUpdate />
      <FlatList
        data={activities}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item) => item.idActivity.toString()}
        renderItem={({ item }) => <AgendaActivityItem date={date} day={day} {...item} />}
      />
    </>
  )
}

export default AgendaActivity
