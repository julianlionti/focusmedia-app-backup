import { createReducer } from '@reduxjs/toolkit'
import { removeError, removeRequest, setError, setRequest } from '../actions/loadingActions'
import { useAppSelector } from '../hooks/redux'

interface LoadingState {
  requests: string[]
  errors: Record<string, string>
}

const initialState: LoadingState = {
  requests: [],
  errors: {}
}

const loadingReducer = createReducer(initialState, (builder) => {
  builder.addCase(setRequest, (state, action) => {
    state.requests = [...new Set([...state.requests, action.payload])]
  })
  builder.addCase(removeRequest, (state, action) => {
    state.requests = state.requests.filter((req) => req !== action.payload)
  })
  builder.addCase(setError, (state, action) => {
    state.errors[action.payload.key] = action.payload.error
  })
  builder.addCase(removeError, (state, action) => {
    delete state.errors[action.payload.key]
  })
})

export const useLoadingState = () => useAppSelector(({ loadingReducer }) => loadingReducer)
export default loadingReducer
