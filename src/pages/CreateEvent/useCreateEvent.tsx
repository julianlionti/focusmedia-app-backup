import { Option } from '../../components/Dropdown/Dropdown'
import useSelectedEvent from '../../hooks/useSelectedEvent'
import { useT } from '../../translations'
import * as Yup from 'yup'
import { DateOrEmpty } from '../../components/TimeRange/useTimeRange'
import { useAppDispatch } from '../../hooks/redux'
import { createOwnEvent } from '../../actions/eventsActions'
import { useEventsState } from '../../reducers/eventsReducer'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions'
import {
  askForCalendarPermission,
  checkCalendarPermission,
  clearCalendarPermission
} from '../../actions/userActions'
import { useUserState } from '../../reducers/userReducer'

export interface CreateEventValues {
  title: string
  description: string
  day: string
  date: string
  range: {
    start: DateOrEmpty
    end: DateOrEmpty
  }
  eventAlarm: boolean
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  day: Yup.string().required(),
  range: Yup.object().shape({
    end: Yup.date()
      .nullable()
      .default(null)
      .when(
        'start',
        (start, yup) => start && yup.min(start, 'End time cannot be before start time')
      )
  })
})

const useCreateEvent = () => {
  const t = useT()
  const dispatch = useAppDispatch()
  const { generalAgenda } = useSelectedEvent()
  const { ownEvents } = useEventsState()
  const { calendarPermissionStatus } = useUserState()
  const [alreadyExists, setAlreadyExits] = useState(false)
  const navigation = useNavigation()

  const initialValues: CreateEventValues = {
    title: '',
    description: '',
    day: '',
    date: '',
    range: {
      start: '',
      end: ''
    },
    eventAlarm: true
  }

  const onSubmitEvent = (values: CreateEventValues) => {
    const { day, range } = values
    const numberDay = parseInt(day, 10)
    const finalRange = {
      end: range.end ? moment(range.end).format('HH:mm') : '',
      start: range.start ? moment(range.start).format('HH:mm') : ''
    }

    const exists = ownEvents.find(
      (ev) => ev.beginning === finalRange.start && ev.end === finalRange.end && ev.day === numberDay
    )
    if (exists) {
      setAlreadyExits(true)
    } else {
      setAlreadyExits(false)
      dispatch(createOwnEvent({ ...values, range: finalRange }))
      navigation.goBack()
    }
  }

  const days: Option[] = generalAgenda.map((ag) => ({
    label: `${t('agenda.day')} ${ag.day} - ${ag.date}`,
    value: ag.day.toString(),
    data: { day: ag.day, date: ag.date }
  }))

  const closeAlreadyExists = () => {
    setAlreadyExits(false)
  }

  const closePermissionModal = () => {
    dispatch(clearCalendarPermission())
  }

  const askForPermissions = () => {
    dispatch(askForCalendarPermission())
  }

  useEffect(() => {
    dispatch(checkCalendarPermission())
  }, [dispatch])

  return {
    t,
    initialValues,
    validationSchema,
    onSubmitEvent,
    days,
    alreadyExists,
    closeAlreadyExists,
    closePermissionModal,
    hasToAskForCalendarPermission: calendarPermissionStatus === 'denied',
    hasGrantedCalendarPermission: calendarPermissionStatus === 'granted',
    askForPermissions,
    isPrepared: calendarPermissionStatus !== ''
  }
}

export default useCreateEvent
