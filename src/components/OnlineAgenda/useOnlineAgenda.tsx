import { useCallback, useEffect, useMemo } from 'react'
import { getUserAgenda } from '../../actions/userActions'
import { useAppDispatch } from '../../hooks/redux'
import { IOnlineAgenda } from '../../models/IOnlineAgenda'
import { useUserState } from '../../reducers/userReducer'
import { useT } from '../../translations'

const useOnlineAgenda = () => {
  const t = useT()
  const { agenda, username } = useUserState()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserAgenda())
  }, [dispatch])

  const sections = useMemo(() => {
    const initialSection: { title: string; eventDay: number; data: IOnlineAgenda[] }[] = []
    return agenda
      .reduce((acc, it) => {
        const isCancelled = it.stateId === 5
        const exists = acc.find((sec) => sec.eventDay === it.eventDay)
        if (it.eventDay === 0) return acc
        if (exists) {
          if (!isCancelled) exists.data.push(it)
          return acc
        }

        const data = []
        if (!isCancelled) {
          data.push(it)
        }
        return [
          ...acc,
          { title: `${t('agenda.day')} ${it.eventDay}`, eventDay: it.eventDay, data }
        ].sort((a, b) => a.eventDay - b.eventDay)
      }, initialSection)
      .filter((e) => e.data.length > 0)
  }, [agenda, t])

  const isLoading = !!username && !agenda.length

  const refreshItems = useCallback(() => {
    dispatch(getUserAgenda({ refresh: true }))
  }, [dispatch])

  return { t, agenda: sections, username, isLoading, refreshItems }
}

export default useOnlineAgenda
