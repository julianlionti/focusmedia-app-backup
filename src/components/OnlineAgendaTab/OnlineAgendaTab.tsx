import React from 'react'
import { useUserState } from '../../reducers/userReducer'
import OnlineAgenda from '../OnlineAgenda/OnlineAgenda'
import OnlineAgendaLogin from '../OnlineAgendaLogin/OnlineAgendaLogin'

const OnlineAgendaTab = () => {
  const { username, errorLogin } = useUserState()
  if (username && !errorLogin) return <OnlineAgenda />

  return <OnlineAgendaLogin />
}

export default OnlineAgendaTab
