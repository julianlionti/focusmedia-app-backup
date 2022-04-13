import { NativeModules, Platform } from 'react-native'
import fs from 'react-native-fs'
import { IEvent } from '../models/IEvent'
import {
  IActivityDetail,
  IAgendaActivity,
  IAgendaSponsor,
  IFullEvent,
  IParticipant
} from '../models/IFullEvent'
import { IFullOriginalEvent } from '../models/IFullOriginalEvent'
import { IOnlineAgenda } from '../models/IOnlineAgenda'
import { IOriginalOnlineAgenda } from '../models/IOriginalOnlineAgenda'
import Config, { APPS_TYPE } from './Config'

const deviceLanguage: string =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier

const deviceLang = deviceLanguage.substring(0, deviceLanguage.indexOf('_'))
const langCode = deviceLang === 'es' ? 1 : 2

const getHashedTitle = () => {
  switch (Config.APP_NAME) {
    case 'BRAND':
      return '#Brand100'
    case 'RETAIL':
      return '#Retail100'
    default:
      return 'NO EVENT IN .ENV'
  }
}

const getTitle = () => {
  switch (Config.APP_NAME) {
    case 'BRAND':
      return 'Brand 100'
    case 'RETAIL':
      return 'Retail 100'
    default:
      return 'NO EVENT IN .ENV'
  }
}

const filterEventBy =
  (app: APPS_TYPE) =>
  (ev: IEvent): boolean => {
    const { name, active } = ev
    let predicate = active || false

    predicate =
      predicate &&
      (app === 'BRAND'
        ? name.toUpperCase().includes('BRAND')
        : name.toUpperCase().includes('RETAIL'))

    return predicate
  }

const filePrefix = `file://`
const resourcesPath = `${fs.CachesDirectoryPath}/event-data/`
const imagePrefix = `${filePrefix}${resourcesPath}`

const prepareImage = (path: string) => {
  const lastChar = path.slice(path.length - 1)
  if (!path || lastChar === '/') return ''
  const tick = Date.now()
  return `${imagePrefix}${path}?time=${tick}`
}

type GenerateEventTopicProps = { id: number; langCode: number }
const generateEventTopic = ({ id, langCode }: GenerateEventTopicProps) =>
  `i-evento-${id}-${langCode}`

const generateEventUrl = (ev: IFullOriginalEvent) => {
  const alternatives = ['agenda', 'Agenda', 'Booking', 'booking']
  let agendaIndex = -1
  alternatives.forEach((name) => {
    if (ev.urlAgendaPersonal.indexOf(name) > agendaIndex) {
      agendaIndex = ev.urlAgendaPersonal.indexOf(name)
    }
  })

  const finalUrl = ev.urlAgendaPersonal.substring(0, agendaIndex)
  return finalUrl
}

const legacyToFinalEvent = (ev: IFullOriginalEvent): IFullEvent => ({
  active: ev.activo,
  adveryisments: ev.publicidades.map((ad) => ({
    ...ad,
    vertical: prepareImage(ad.vertical)
  })),
  agendaPhtosUrl: ev.urlAgendaFotos,
  catalogue: ev.catalogo.map((ca) => ({
    name: ca.nombre,
    logo: prepareImage(ca.logo),
    information: ca.informacion,
    idCatalogue: ca.idCatalogo,
    news: ca.novedades,
    participants: ca.asistentes.map(
      (pa): IParticipant => ({
        name: pa.nombre,
        gender: pa.genero,
        mail: pa.mail,
        photo: prepareImage(pa.foto),
        position: pa.cargo,
        surname: pa.apellido
      })
    )
  })),
  color: ev.color,
  date: ev.fecha,
  duration: ev.duracion,
  endDate: ev.fechaFin,
  featured: ev.destacados.map((fea) => ({
    id: fea.id,
    image: prepareImage(fea.imagen),
    name: fea.nombre
  })),
  generalAgenda: ev.agendaGeneral.map((ag) => ({
    activities: ag.actividades.map(
      (ac): IAgendaActivity => ({
        beginning: ac.inicio,
        description: ac.descripcion,
        details: ac.detalles.map(
          (de): IActivityDetail => ({
            description: de.descripcion,
            idDetail: de.idDetalle,
            ids: de.ids,
            images: de.imagenes.map((img) => prepareImage(img)),
            title: de.titulo
          })
        ),
        end: ac.fin,
        idActivity: ac.idActividad,
        name: ac.nombre,
        order: ac.orden,
        schedule: ac.horario,
        sponsors: ac.auspiciantes.map(
          (sp): IAgendaSponsor => ({
            idSponsor: sp.idAuspiciante,
            image: prepareImage(sp.imagen),
            name: sp.nombre
          })
        )
      })
    ),
    date: ag.fecha,
    day: ag.dia
  })),
  hasSponsor: ev.existeSponsor,
  id: ev.id,
  images: ev.imagenes.map((img) => prepareImage(img)),
  information: ev.informacion,
  lang: ev.idioma,
  lastUpdate: ev.ultimaActualizacion,
  lastUpdateFeature: ev.destacadosUltimaActualizacion,
  lastUpdateMaps: ev.planosUltimaActualizacion,
  logo: prepareImage(ev.logo),
  maps: ev.planos.map((ma) => ({
    id: ma.id,
    image: prepareImage(ma.imagen),
    name: ma.nombre
  })),
  menu: {
    address: ev.menu.direccion,
    contact: ev.menu.contacto,
    idMenu: ev.menu.idMenu,
    socialNetworks: ev.menu.redes
  },
  name: ev.nombre,
  oneToOneAgendaUrl: ev.urlAgendaPersonal,
  eventUrl: generateEventUrl(ev),
  place: ev.lugar,
  sponsors: prepareImage(ev.sponsors),
  startDate: ev.fechaInicio,
  type: ev.tipo,
  updates: ev.actualizaciones.map((up) => ({
    lastUpdate: up.ultimaActualizacion,
    code: up.codigo
  })),
  welcome: {
    hasImage: ev.bienvenida.existeImagen,
    image: prepareImage(ev.bienvenida.imagen),
    title: ev.bienvenida.titulo,
    welcome: ev.bienvenida.bienvenida
  }
})

const legacyToFinalAgenda = (ag: IOriginalOnlineAgenda): IOnlineAgenda => ({
  businessName: ag.ContraparteRazonSocial,
  buyerId: ag.IDComprador,
  endDate: ag.FechaFin,
  endHour: ag.HoraFin,
  eventDay: ag.DiaEvento,
  meetingId: ag.IDReunion,
  name: ag.ContraparteNombre,
  originator: ag.Originante,
  photoUrl: ag.ContraparteFotoFile,
  selectable: ag.Seleccionable,
  sellerId: ag.IDVendedor,
  stand: ag.Stand,
  startDate: ag.FechaFin,
  startHour: ag.HoraInicio,
  state: ag.Estado,
  stateId: ag.IDEstado,
  surname: ag.ContraparteApellido
})

const getPrimaryColor = (event: APPS_TYPE) => {
  switch (event) {
    default:
    case 'BRAND':
      return '#28c4c5'
    case 'RETAIL':
      return '#bb8b2a'
  }
}

const getColorPallete = (event: APPS_TYPE) => {
  switch (event) {
    default:
    case 'BRAND':
      return {
        50: '#ddfefe',
        100: '#b7f5f5',
        200: '#8eeced',
        300: '#66e5e6',
        400: '#40dedf',
        500: '#28c4c5',
        600: '#199899',
        700: '#0a6d6e',
        800: '#004243',
        900: '#001818'
      }
    case 'RETAIL':
      return {
        50: '#fef5df',
        100: '#f3e1bc',
        200: '#e9cd94',
        300: '#deb86c',
        400: '#d5a444',
        500: '#bb8b2a',
        600: '#926c1f',
        700: '#694d14',
        800: '#3f2e08',
        900: '#1a0e00'
      }
  }
}

const EventHelpers = {
  deviceLang,
  langCode,
  getTitle,
  generateEventTopic,
  getHashedTitle,
  filterEventBy,
  legacyToFinalEvent,
  legacyToFinalAgenda,
  getColorPallete,
  getPrimaryColor,
  resourcesPath
}

export default EventHelpers
