import React from 'react'
import { FlatList } from 'native-base'
import ParticipantsItem from '../ParticipantsItem'
import { IParticipant } from '../../models/IFullEvent'
import HasToUpdate from '../HasToUpdate/HasToUpdate'

interface Props {
  participants: IParticipant[]
}

const ParicipantsCatalogueTab: React.FC<Props> = (props) => {
  const { participants } = props
  return (
    <>
      <HasToUpdate />
      <FlatList
        keyExtractor={(item) => item.name + item.surname + item.position}
        data={participants}
        numColumns={2}
        renderItem={({ item }) => <ParticipantsItem {...item} />}
      />
    </>
  )
}

export default ParicipantsCatalogueTab
