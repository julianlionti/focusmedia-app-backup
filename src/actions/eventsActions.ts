import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { IEvent, IEventOriginal } from '../models/IEvent'
import { RootState } from '../store/store'
import EventHelpers from '../utils/eventHelper'
import { makeRequest } from '../utils/makeRequest'
import Urls from '../utils/urls'
import { CreateOwnEvent, FavoriteAgendaType, IDownloadProgress } from '../reducers/eventsReducer'
import { ICatalogue, IFullEvent, ILang } from '../models/IFullEvent'
import { IFullOriginalEvent, IOriginalUpdate } from '../models/IFullOriginalEvent'
import RNFetchBlob from 'rn-fetch-blob'
import Config from '../utils/Config'
import { unzip } from 'react-native-zip-archive'
import { FavoriteType } from '../pages/OneToOneAgenda/useOneToOneAgenda'
import messaging from '@react-native-firebase/messaging'

const fs = RNFetchBlob.fs
const prefix = `events/`

export const setHasToUpdate = createAction<boolean>(`${prefix}set-show-has-to-update`)
export const setProgress = createAction<IDownloadProgress>(`${prefix}download-progress`)
export const setIsDownloading = createAction<boolean>(`${prefix}set-is-downloading`)
export const setIsUnzipping = createAction<boolean>(`${prefix}set-is-unzipping`)
export const setAlreadyShownAds = createAction<boolean>(`${prefix}set-already-shown-ads`)
export const setAgendaItemFavorite = createAction<FavoriteAgendaType>(
  `${prefix}set-agenda-favorite`
)
export const setCatalogueItemFavorite = createAction<ICatalogue>(`${prefix}set-catalogue-favorite`)
export const emptyFavorites = createAction<FavoriteType>(`${prefix}empty-favorite`)
export const createOwnEvent = createAction<CreateOwnEvent>(`${prefix}create-own-favorite`)
export const deleteOwnEvent = createAction<FavoriteAgendaType>(`${prefix}delete-own-favorite`)

type GetEventProps = { refresh?: boolean }
type GetEventsReturn = IEvent[]
export const getEvents = createAsyncThunk<GetEventsReturn, GetEventProps | undefined>(
  `${prefix}get-events`,
  async (props, { getState }) => {
    const { refresh } = props || {}
    const { eventsReducer } = getState() as RootState
    const { events } = eventsReducer
    if (events.length > 0 && !refresh) return events
    const data = await makeRequest({ url: Urls.events, method: 'POST' })
    if (!data) return []
    return (data.Eventos as IEventOriginal[])
      .map(
        (ev): IEvent => ({
          active: ev.activo,
          id: ev.id,
          name: ev.nombre,
          lang: ev.idiomas.map((lang) => ({
            id: lang.id,
            name: lang.nombre,
            xmlName: lang.nombreXml
          })),
          image: ev.imagen
        })
      )
      .filter(EventHelpers.filterEventBy(Config.APP_NAME))
  }
)

type DownloadEventProps = { id: number; lang: ILang[] }
export const downloadEvent = createAsyncThunk<IFullEvent | null, DownloadEventProps>(
  `${prefix}download-event`,
  async ({ id, lang }, { dispatch, getState }) => {
    const { eventsReducer } = getState() as RootState
    const { isDownloading } = eventsReducer
    const langCode = lang.find((l) => l.id === EventHelpers.langCode)?.id || 1

    if (isDownloading) return eventsReducer.selectedEvent
    dispatch(setIsDownloading(true))

    const zipPath = `${fs.dirs.CacheDir}/resources.zip`
    const { path } = await RNFetchBlob.config({
      fileCache: true,
      path: zipPath
    })
      .fetch(
        'POST',
        `${Config.BASE_URL}${Urls.downloadEvent}`,
        { 'Content-Type': 'application/json' },
        JSON.stringify({ id, codigoIdioma: langCode })
      )
      .progress((loaded, total) => {
        dispatch(setProgress({ loaded, total }))
      })
    dispatch(setProgress({ loaded: 1, total: 1 }))
    dispatch(setIsDownloading(false))
    dispatch(setIsUnzipping(true))

    const resPath = EventHelpers.resourcesPath
    const eventDataDirExists = await fs.exists(resPath)
    if (!eventDataDirExists) {
      await fs.mkdir(resPath)
    }

    await unzip(path(), resPath)

    const legacyString = await fs.readFile(`${resPath}textos.json`, 'utf8')
    const legacyEvent = JSON.parse(legacyString) as IFullOriginalEvent
    const selectedEvent = EventHelpers.legacyToFinalEvent(legacyEvent)
    dispatch(setIsUnzipping(false))

    messaging().subscribeToTopic(EventHelpers.generateEventTopic({ id, langCode }))
    return selectedEvent
  }
)

export const cleanSelectedEvent = createAsyncThunk<null>(
  `${prefix}clean-selected-event`,
  async (_, { getState }) => {
    const { eventsReducer } = getState() as RootState
    const { selectedEvent } = eventsReducer
    if (selectedEvent) {
      const { id, lang } = selectedEvent
      messaging().unsubscribeFromTopic(EventHelpers.generateEventTopic({ id, langCode: lang }))
    }
    await fs.unlink(EventHelpers.resourcesPath)
    return null
  }
)

export const checkForUpdates = createAsyncThunk<boolean>(
  `${prefix}check-for-updates`,
  async (_, { getState }) => {
    const { eventsReducer } = getState() as RootState
    const { selectedEvent } = eventsReducer
    if (!selectedEvent) throw Error('Method must be called inside event')
    const data = {
      id: selectedEvent.id,
      codigoIdioma: selectedEvent.lang,
      actualizaciones: selectedEvent.updates.map(
        (up): IOriginalUpdate => ({ codigo: up.code, ultimaActualizacion: up.lastUpdate })
      )
    }

    const response = await makeRequest({ url: Urls.checkUpdates, method: 'POST', data })
    return response.Actualizar && response.Exitoso
  }
)
