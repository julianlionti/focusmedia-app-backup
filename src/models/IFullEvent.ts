export interface ILang {
  id: number
  name: string
  xmlName: string
}

export interface IWelcome {
  hasImage: boolean
  image: string
  title: string
  welcome: string
}

export interface IMenu {
  idMenu: number
  address: string
  contact: string
  socialNetworks: string
}

export interface IAgendaSponsor {
  idSponsor: number
  name: string
  image: string
}

export interface IActivityDetail {
  idDetail: number
  ids: number[]
  title: string
  description: string
  images: string[]
}

export interface IAgendaActivity {
  idActivity: number
  name: string
  description: string
  schedule: string
  order: number
  beginning: string | null
  end: string | null
  details: IActivityDetail[]
  sponsors: IAgendaSponsor[]
}

export interface IAgenda {
  day: number
  date: string
  activities: IAgendaActivity[]
}

export interface IMap {
  id: number
  name: string
  image: string
}

export interface IFeatured {
  id: number
  name: string
  image: string
}

export interface IParticipant {
  photo: string
  mail: string
  name: string
  surname: string
  position: string
  gender: string
}

export interface ICatalogue {
  idCatalogue: number
  logo: string
  name: string
  news: string
  information: string
  participants: IParticipant[]
}

export interface IUpdate {
  code: number
  lastUpdate: string
}

export interface IAd {
  horizontal: string
  idPublicidad: number
  link: string
  vertical: string
}

export interface IFullEvent {
  id: number
  lang: number
  name: string
  startDate: string
  endDate: string
  date: string
  duration: number
  lastUpdate: string
  place: string
  logo: string
  active: boolean
  images: string[]
  sponsors: string
  hasSponsor: boolean
  color: string
  type: number
  information: string
  welcome: IWelcome
  menu: IMenu
  oneToOneAgendaUrl: string
  eventUrl: string
  agendaPhtosUrl: string
  lastUpdateMaps: string | null
  lastUpdateFeature: string | null
  generalAgenda: IAgenda[]
  maps: IMap[]
  featured: IFeatured[]
  adveryisments: IAd[]
  catalogue: ICatalogue[]
  updates: IUpdate[]
}
