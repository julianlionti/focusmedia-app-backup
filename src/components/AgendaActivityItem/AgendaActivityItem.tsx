import React from 'react'
import { Button, Heading, HStack, IconButton, Text, Box, VStack } from 'native-base'
import { IAgenda, IAgendaActivity } from '../../models/IFullEvent'
import { parseHtml } from '../../utils/textUtils'
import useAgendaActivityItem from './useAgendaActivityItem'
import AgendaSponsorItem from '../AgendaSponsorItem/AgendaSponsorItem'
import MaterialIcon from '../MaterialIcon'
import CustomModal from '../CustomModal/CustomModal'
import { Trans } from 'react-i18next'

type MergedTypes = Omit<IAgenda, 'activities'> & IAgendaActivity
export interface AgendaActivityItemProps extends MergedTypes {
  isFromFav?: boolean
  isOwn?: boolean
}

const AgendaActivityItem: React.FC<AgendaActivityItemProps> = (props) => {
  const {
    t,
    color,
    description,
    sponsors,
    hasDetail,
    name,
    schedule,
    openDetail,
    isFavorite,
    isOwn,
    removeOwn,
    pressDelete,
    deleteConfirmation,
    pressFavorite,
    favConfirmation,
    closeDeleteDlg,
    closeFavDlg,
    setFavorite
  } = useAgendaActivityItem(props)
  return (
    <>
      <HStack alignItems={'center'} py="2">
        {isOwn && (
          <IconButton onPress={pressDelete}>
            <MaterialIcon name="delete" color={color} />
          </IconButton>
        )}
        {!isOwn && (
          <IconButton onPress={pressFavorite}>
            <MaterialIcon name={isFavorite ? 'star' : 'star-border'} color={color} />
          </IconButton>
        )}
        <VStack flex={1} mr="4" space="1">
          {/* <HStack alignItems={'center'} space={2} pr={2} justifyContent={'space-between'}>
            <Heading size={'sm'} color="darkText" isTruncated>
              {name}
            </Heading>
            <Text minW={90} textAlign={'right'} color="darkText">
              {schedule}
            </Text>
          </HStack> */}
          <Box flexDirection={'row'}>
            <Heading size={'sm'} flex={1} color="darkText">
              {name}
            </Heading>
            <Text fontWeight={'bold'} textAlign={'right'} color="darkText">
              {schedule}
            </Text>
          </Box>
          <Text color="darkText">{parseHtml(description)}</Text>
          <VStack pt="2" mx="2">
            {sponsors?.map((spo) => (
              <AgendaSponsorItem key={spo.idSponsor.toString()} {...spo} />
            ))}
          </VStack>
          {hasDetail && (
            <Box alignItems={'flex-end'}>
              <Button color={color} variant={'link'} onPress={openDetail}>
                {t('agenda.detail')?.toUpperCase()}
              </Button>
            </Box>
          )}
        </VStack>
      </HStack>
      <CustomModal
        onClose={closeDeleteDlg}
        isOpen={deleteConfirmation}
        title={t('onetoone.delete_confirmation_title')}
        description={
          <Trans i18nKey={'onetoone.delete_confirmation_description'} values={{ name }} />
        }
        actionBtn={<Button onPress={removeOwn}>{t('yes')?.toString()}</Button>}
      />
      <CustomModal
        onClose={closeFavDlg}
        isOpen={favConfirmation}
        title={t('onetoone.fav_confirmation_title')}
        description={<Trans i18nKey={'onetoone.fav_confirmation_description'} values={{ name }} />}
        actionBtn={<Button onPress={setFavorite}>{t('yes')?.toString()}</Button>}
      />
    </>
  )
}

export default AgendaActivityItem
