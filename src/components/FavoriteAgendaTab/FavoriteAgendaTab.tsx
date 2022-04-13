import React from 'react'
import { Button, Heading, SectionList } from 'native-base'
import useFavoriteAgendaTab from './useFavoriteAgendaTab'
import FavoriteAgendaSection from '../FavoriteAgendaSection/FavoriteAgendaSection'
import AgendaActivityItem from '../AgendaActivityItem/AgendaActivityItem'
import HasToUpdate from '../HasToUpdate/HasToUpdate'
import EmptyListRoot from '../EmptyListRoot'
import CustomModal from '../CustomModal/CustomModal'

const FavoriteAgendaTab = () => {
  const { t, sections, Fab, showDelete, onCloseDelete, onAcceptDelete, openCreate } =
    useFavoriteAgendaTab()

  if (!sections.length) {
    return (
      <EmptyListRoot fab={Fab} onPressAdd={openCreate}>
        <Heading textAlign={'center'} color={'darkText'}>
          {t('onetoone.empty_agenda')?.toString()}
        </Heading>
      </EmptyListRoot>
    )
  }

  return (
    <>
      <HasToUpdate />
      <SectionList
        sections={sections}
        renderSectionHeader={({ section }) => <FavoriteAgendaSection {...section} />}
        renderItem={({ item }) => <AgendaActivityItem isFromFav {...item} />}
      />
      <CustomModal
        title={t('onetoone.delete_title')}
        description={t('onetoone.delete_description')}
        actionBtn={<Button onPress={onAcceptDelete}>{t('onetoone.delete')?.toString()}</Button>}
        isOpen={showDelete}
        onClose={onCloseDelete}
      />
      {Fab}
    </>
  )
}

export default FavoriteAgendaTab
