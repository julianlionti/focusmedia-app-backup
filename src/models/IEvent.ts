import { ILang } from './IFullEvent'
import { IOriginalLang } from './IFullOriginalEvent'

export interface IEvent {
  active?: boolean
  id: number
  lang: ILang[]
  image: string
  name: string
}

export interface IEventOriginal {
  activo: boolean
  id: number
  idiomas: IOriginalLang[]
  imagen: string
  nombre: string
}
