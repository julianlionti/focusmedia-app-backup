import { RouteProp, useRoute } from '@react-navigation/native'
import { GeneralAgendaStackParamList } from '../../routes/GeneralAgendaStack'

type Route = RouteProp<GeneralAgendaStackParamList, 'Detail'>
const useAgeDetail = () => {
  const { params } = useRoute<Route>()

  return { data: params }
}

export default useAgeDetail
