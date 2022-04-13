import { Store } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { removeRequest, setError, setRequest } from '../actions/loadingActions'
import Config from './Config'

let store: Store
export const injectStore = (_store: Store) => {
  store = _store
}

const axiosInstance = axios.create({
  baseURL: Config.BASE_URL
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MakeRequestFunc = <T = any>(config: AxiosRequestConfig) => Promise<T>
export const makeRequest: MakeRequestFunc = async (config) => {
  if (!store) throw Error('Store must be injected')
  if (!config.url) throw Error('url must be set on request')
  const { url } = config
  const { dispatch } = store
  dispatch(setRequest(url))
  if (!config.method) {
    config.method = 'GET'
  }

  try {
    const { data } = await axiosInstance(config)
    dispatch(removeRequest(url))
    return data
  } catch (err) {
    const axiosError = err as AxiosError
    dispatch(removeRequest(url))
    dispatch(setError({ key: url, error: axiosError.message }))
  }
}
