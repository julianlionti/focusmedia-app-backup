export interface IOriginalLang {
  id: number
  nombre: string
  nombreXml: string
}

export interface IOriginalWelcome {
  existeImagen: boolean
  imagen: string
  titulo: string
  bienvenida: string
}

export interface IOriginalMenu {
  idMenu: number
  direccion: string
  contacto: string
  redes: string
}

export interface IOriginalAgendaSponsor {
  idAuspiciante: number
  nombre: string
  imagen: string
}

export interface IOriginalActivityDetail {
  idDetalle: number
  ids: number[]
  titulo: string
  descripcion: string
  imagenes: string[]
}

export interface IOriginalAgendaActivity {
  idActividad: number
  nombre: string
  descripcion: string
  horario: string
  orden: number
  inicio: string | null
  fin: string | null
  detalles: IOriginalActivityDetail[]
  auspiciantes: IOriginalAgendaSponsor[]
}

export interface IOriginalAgenda {
  dia: number
  fecha: string
  actividades: IOriginalAgendaActivity[]
}

export interface IOriginalMap {
  id: number
  nombre: string
  imagen: string
}

export interface IOriginalFeatured {
  id: number
  nombre: string
  imagen: string
}

export interface IOriginalParticipant {
  foto: string
  mail: string
  nombre: string
  apellido: string
  cargo: string
  genero: string
}

export interface IOriginalCatalogue {
  idCatalogo: number
  logo: string
  nombre: string
  novedades: string
  informacion: string
  asistentes: IOriginalParticipant[]
}

export interface IOriginalUpdate {
  codigo: number
  ultimaActualizacion: string
}

export interface IOriginalAd {
  horizontal: string
  idPublicidad: number
  link: string
  vertical: string
}

export interface IFullOriginalEvent {
  id: number
  idioma: number
  nombre: string
  fechaInicio: string
  fechaFin: string
  fecha: string
  duracion: number
  ultimaActualizacion: string
  lugar: string
  logo: string
  activo: boolean
  imagenes: string[]
  sponsors: string
  existeSponsor: boolean
  color: string
  tipo: number
  informacion: string
  bienvenida: IOriginalWelcome
  menu: IOriginalMenu
  urlAgendaPersonal: string
  urlAgendaFotos: string
  planosUltimaActualizacion: string | null
  destacadosUltimaActualizacion: string | null
  agendaGeneral: IOriginalAgenda[]
  planos: IOriginalMap[]
  destacados: IOriginalFeatured[]
  publicidades: IOriginalAd[]
  catalogo: IOriginalCatalogue[]
  actualizaciones: IOriginalUpdate[]
}
