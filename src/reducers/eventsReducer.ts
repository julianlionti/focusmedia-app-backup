import { createReducer } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import { PersistConfig } from 'redux-persist/es/types'
import {
  setProgress,
  getEvents,
  setIsDownloading,
  setIsUnzipping,
  setAlreadyShownAds,
  setAgendaItemFavorite,
  setCatalogueItemFavorite,
  checkForUpdates,
  downloadEvent,
  cleanSelectedEvent,
  setHasToUpdate,
  emptyFavorites,
  createOwnEvent,
  deleteOwnEvent
} from '../actions/eventsActions'
import { useAppSelector } from '../hooks/redux'
import { IEvent } from '../models/IEvent'
import { IAgenda, IAgendaActivity, ICatalogue, IFullEvent } from '../models/IFullEvent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CreateEventValues } from '../pages/CreateEvent/useCreateEvent'

export interface CreateOwnEvent extends Omit<CreateEventValues, 'range'> {
  range: {
    start: string
    end: string
  }
}
export type IDownloadProgress = { loaded: number; total: number }
export type SectionFavoriteType = Omit<IAgenda, 'activities' | 'date'> & { date?: string }
export type FavoriteAgendaType = IAgendaActivity & SectionFavoriteType & { isOwn?: boolean }
interface EventsState {
  events: IEvent[]
  progress: IDownloadProgress
  isDownloading: boolean
  isUnzipping: boolean
  alreadyShownAds: boolean
  selectedEvent: IFullEvent | null
  favoriteAgenda: FavoriteAgendaType[]
  favoriteCatalogue: ICatalogue[]
  ownEvents: FavoriteAgendaType[]
  hasToUpdate: boolean
  showHasToUpdate: boolean
}

const initialState: EventsState = {
  events: [],
  selectedEvent: null,
  progress: { loaded: 0, total: 0 },
  isDownloading: false,
  isUnzipping: false,
  alreadyShownAds: false,
  favoriteAgenda: [],
  favoriteCatalogue: [],
  ownEvents: [],
  hasToUpdate: false,
  showHasToUpdate: false
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getEvents.pending, (state) => {
    state.events = []
  })
  builder.addCase(getEvents.fulfilled, (state, action) => {
    state.events = action.payload
  })
  builder.addCase(downloadEvent.fulfilled, (state, action) => {
    state.selectedEvent = action.payload
    state.hasToUpdate = false
    state.showHasToUpdate = false
  })
  builder.addCase(setProgress, (state, action) => {
    state.progress = action.payload
  })
  builder.addCase(setIsDownloading, (state, action) => {
    state.isDownloading = action.payload
  })
  builder.addCase(setIsUnzipping, (state, action) => {
    state.isUnzipping = action.payload
  })
  builder.addCase(cleanSelectedEvent.fulfilled, (state) => {
    state.selectedEvent = null
    state.favoriteAgenda = []
    state.favoriteCatalogue = []
    state.ownEvents = []
  })
  builder.addCase(setAlreadyShownAds, (state, action) => {
    state.alreadyShownAds = action.payload
  })
  builder.addCase(setAgendaItemFavorite, (state, action) => {
    const { idActivity } = action.payload
    const index = state.favoriteAgenda.find((e) => e.idActivity === idActivity)
    if (index) {
      state.favoriteAgenda = state.favoriteAgenda.filter((e) => e.idActivity !== idActivity)
    } else {
      state.favoriteAgenda.push(action.payload)
    }
  })
  builder.addCase(setCatalogueItemFavorite, (state, action) => {
    const { idCatalogue } = action.payload
    const index = state.favoriteCatalogue.find((e) => e.idCatalogue === idCatalogue)
    if (index) {
      state.favoriteCatalogue = state.favoriteCatalogue.filter((e) => e.idCatalogue !== idCatalogue)
    } else {
      state.favoriteCatalogue.push(action.payload)
    }
  })
  builder.addCase(checkForUpdates.fulfilled, (state, action) => {
    state.showHasToUpdate = action.payload
  })
  builder.addCase(setHasToUpdate, (state, action) => {
    state.hasToUpdate = action.payload
  })
  builder.addCase(emptyFavorites, (state, action) => {
    if (action.payload === 'Agenda') {
      state.favoriteAgenda = []
      state.ownEvents = []
    } else {
      state.favoriteCatalogue = []
    }
  })
  builder.addCase(createOwnEvent, (state, action) => {
    const { date, day, description, range, title } = action.payload
    const numberDay = parseInt(day, 10)
    const baseId = 999900

    state.ownEvents.push({
      date,
      day: numberDay,
      beginning: range.start,
      end: range.end,
      description,
      details: [],
      idActivity: baseId + state.ownEvents.length,
      name: title,
      schedule: `${range.start} ${range.end}`,
      sponsors: [],
      order: 10,
      isOwn: true
    })
  })
  builder.addCase(deleteOwnEvent, (state, action) => {
    state.ownEvents = state.ownEvents.filter((own) => own.idActivity !== action.payload.idActivity)
  })
})

const persistConfig: PersistConfig<EventsState> = {
  key: 'events',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['selectedEvent', 'favoriteAgenda', 'favoriteCatalogue', 'ownEvents']
}
const eventsReducer = persistReducer(persistConfig, reducer)

export const useEventsState = () => useAppSelector(({ eventsReducer }) => eventsReducer)
export default eventsReducer
