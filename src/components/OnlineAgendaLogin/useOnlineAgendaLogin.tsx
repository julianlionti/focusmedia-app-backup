import { useDispatch } from 'react-redux'
import { cleanError, login } from '../../actions/userActions'
import { useUserState } from '../../reducers/userReducer'
import { useT } from '../../translations'

export interface LoginState {
  username: string
  password: string
}

const initialState: LoginState = {
  username: '',
  password: ''
}

const useOnlineAgendaLogin = () => {
  const t = useT()
  const { errorLogin } = useUserState()
  const dispatch = useDispatch()

  const onLoginSubmit = (values: LoginState) => {
    dispatch(login(values))
  }

  const closeError = () => {
    dispatch(cleanError())
  }

  return { t, initialState, onLoginSubmit, errorLogin, closeError }
}

export default useOnlineAgendaLogin
