import React from 'react'
import { CheckIcon, FormControl, ISelectProps, Select } from 'native-base'
import useDropdown from './useDropdown'
import { StringMap, TOptions } from 'i18next'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Option = { label: string; value: string; data?: any }
export interface DropdownProps extends Omit<ISelectProps, 'placeholder'> {
  id: string
  title: string | TOptions<StringMap> | undefined
  placeholder?: string | TOptions<StringMap> | undefined
  options: Option[]
  onChange?: (
    option: Option,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  ) => void
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { options, title, value, touched, error, onChangeValue } = useDropdown(props)
  return (
    <FormControl isInvalid={!!error && touched}>
      <Select
        selectedValue={value}
        placeholder={title as string}
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size="5" />
        }}
        mt={1}
        onValueChange={(itemValue) => onChangeValue(itemValue)}
      >
        {options.map(({ label, value }) => (
          <Select.Item key={value} label={label} value={value} />
        ))}
      </Select>
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  )
}

export default Dropdown
