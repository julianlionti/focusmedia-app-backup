import React, { useMemo } from 'react'
import { Avatar, Box, Heading, Text, useTheme, VStack } from 'native-base'
import { IOnlineAgenda } from '../models/IOnlineAgenda'
import useSelectedEvent from '../hooks/useSelectedEvent'
import moment from 'moment'
import { useT } from '../translations'
import { Trans } from 'react-i18next'
import normalize from 'react-native-normalize'

const parsedString = (noiseDate: string) => noiseDate.replace('/Date(', '').replace(')/', '')

const OnlineAgendaItem: React.FC<IOnlineAgenda> = (props) => {
  const { colors } = useTheme()
  const t = useT()
  const { photoUrl, name, surname, businessName, startHour, endHour, state, stateId } = props
  const { agendaPhtosUrl } = useSelectedEvent()

  const schedule = useMemo(() => {
    const start = moment(parsedString(startHour), 'x').format('HH:mm')
    const end = moment(parsedString(endHour), 'x').format('HH:mm')

    return { start, end }
  }, [startHour, endHour])

  const meetingState = useMemo(() => {
    if (stateId === 10) return { text: t('onetoone.confirm'), color: colors.green[500] }
    if (stateId === 1) return { text: t('onetoone.pending'), color: colors.orange[500] }
    return { text: state, color: colors.darkText }
  }, [stateId, t, colors, state])

  return (
    <Box flexDirection={'row'} p={1} height={normalize(110, 'height')}>
      <Avatar source={{ uri: agendaPhtosUrl + photoUrl }} mr={4} size={normalize(100, 'height')} />
      <VStack flex={1} space={2} height={'90%'} justifyContent={'space-between'}>
        <Heading color="darkText" size="sm">{`${name} ${surname}`}</Heading>
        <Text color="darkText">{businessName}</Text>
      </VStack>
      <VStack mr={2} space={2} height={'90%'} justifyContent={'space-between'}>
        <Heading size="sm" color="darkText" textAlign={'right'}>
          <Trans i18nKey={'scheduled'} values={schedule} />
        </Heading>
        <Text fontWeight={'bold'} color={meetingState.color} textAlign={'right'}>
          {meetingState.text?.toString()}
        </Text>
      </VStack>
    </Box>
  )
}

export default OnlineAgendaItem
