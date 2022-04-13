import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { LoginState } from '../components/OnlineAgendaLogin/useOnlineAgendaLogin'
import { INotification } from '../models/INotification'
import { IOnlineAgenda } from '../models/IOnlineAgenda'
import { IOriginalOnlineAgenda } from '../models/IOriginalOnlineAgenda'
import { RootState } from '../store/store'
import Config from '../utils/Config'
import EventHelpers from '../utils/eventHelper'
import { makeRequest } from '../utils/makeRequest'
import messaging from '@react-native-firebase/messaging'
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions'
import { Platform } from 'react-native'

const prefix = `user/`

export const login = createAction<LoginState>(`${prefix}login`)
export const logout = createAction(`${prefix}logout`)
export const cleanError = createAction(`${prefix}clean-error`)
export const setNotification = createAction<INotification>(`${prefix}set-notification`)
export const cleanAllNotifications = createAction(`${prefix}clean-all-notifications`)
export const clearPermissions = createAction(`${prefix}clear-permissions`)
export const clearCalendarPermission = createAction(`${prefix}clear-calendar-permissions`)

type GetUserAgendaProps = { refresh?: boolean } | undefined
export const getUserAgenda = createAsyncThunk<IOnlineAgenda[], GetUserAgendaProps>(
  `${prefix}get-user-agenda`,
  async (props, { getState, rejectWithValue }) => {
    const { refresh } = props || {}
    const { eventsReducer, userReducer } = getState() as RootState
    const { selectedEvent } = eventsReducer
    const { agenda, password, username } = userReducer
    if (agenda.length > 0 && !refresh) return agenda

    if (!selectedEvent) throw Error('No selected event')
    const { eventUrl } = selectedEvent
    const finalUrl = `${eventUrl}${Config.AGENDA_SUFFIX}`
    const response = await makeRequest({
      baseURL: '',
      url: finalUrl,
      params: { pPass: password, pUser: username.toLowerCase() }
    })
    if (response.Retorno && response.Modulos.length === 0) {
      return rejectWithValue(response.Retorno)
    }
    const modules = response.Modulos as IOriginalOnlineAgenda[]
    return modules.map(EventHelpers.legacyToFinalAgenda)
  }
)

export const notificationPermission = createAsyncThunk<boolean>(
  `${prefix}-notification-permission`,
  async (_, { getState }) => {
    const { userReducer } = getState() as RootState
    const { hasToAskForNotificationPermission } = userReducer
    if (hasToAskForNotificationPermission === false) return false

    const authorizationStatus = await messaging().requestPermission()
    console.log('Permission status:', authorizationStatus)
    if (
      authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      return false
    } else {
      return true
    }
  }
)

const calendarPermission =
  Platform.OS === 'android' ? PERMISSIONS.ANDROID.WRITE_CALENDAR : PERMISSIONS.IOS.CALENDARS

export const checkCalendarPermission = createAsyncThunk<PermissionStatus>(
  `${prefix}check-calendar-permission`,
  async () => {
    const status = await check(calendarPermission)
    return status
  }
)

export const askForCalendarPermission = createAsyncThunk<PermissionStatus>(
  `${prefix}ask-calendar-permissions`,
  async () => {
    const wasGranted = await request(calendarPermission)
    return wasGranted
  }
)
