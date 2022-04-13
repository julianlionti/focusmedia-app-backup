import { useField } from 'formik'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { useT } from '../../translations'
import { TimeRangeProps } from './TimeRange'

export type DateOrEmpty = Date | ''
type TypeRangeValue = { start: DateOrEmpty; end: DateOrEmpty }
const useTimeRange = (props: TimeRangeProps) => {
  const { id } = props
  const [{ value }, { error, touched }, { setValue, setTouched }] = useField<TypeRangeValue>(id)
  const [showPicker, setShowPicker] = useState<'start' | 'end' | ''>('')
  const t = useT()

  const onChangePicker = (val: Date | undefined) => {
    setShowPicker('')
    setTouched(true)
    setValue({
      ...value,
      [showPicker]: val ? moment(val).set('second', 0).set('millisecond', 0).toDate() : ''
    })
  }

  const finalError = useMemo(() => {
    if (!error) return { start: '', end: '' }
    return error as unknown as { start: string; end: string }
  }, [error])

  return {
    t,
    showPicker,
    setShowPicker,
    onChangePicker,
    error: finalError,
    touched,
    ...value,
    isInvalid: (!!finalError.end || !!finalError.start) && touched
  }
}

export default useTimeRange
