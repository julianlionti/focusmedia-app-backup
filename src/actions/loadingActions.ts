import { createAction } from '@reduxjs/toolkit'

const prefix = 'loading/'

export const setError = createAction<{ key: string; error: string }>(`${prefix}set-error`)
export const removeError = createAction<{ key: string }>(`${prefix}remove-error`)
export const setRequest = createAction<string>(`${prefix}set-request`)
export const removeRequest = createAction<string>(`${prefix}remove-request`)
