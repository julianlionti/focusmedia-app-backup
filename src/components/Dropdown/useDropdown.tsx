import { useField, useFormikContext } from 'formik'
import { DropdownProps } from './Dropdown'

const useDropdown = (props: DropdownProps) => {
  const { id, title, placeholder, options, onChange, ...dropDownProps } = props
  const [{ value }, { error, touched }, { setValue }] = useField(id)
  const { setFieldValue } = useFormikContext()

  const onChangeValue = (value: string) => {
    if (onChange) {
      const option = options.find((opt) => opt.value === value)
      if (!option) throw Error('No option found')
      onChange(option, setFieldValue)
    } else {
      setValue(value)
    }
  }
  return {
    value: value.toString(),
    onChangeValue,
    error,
    touched,
    title,
    placeholder,
    options,
    ...dropDownProps
  }
}

export default useDropdown
