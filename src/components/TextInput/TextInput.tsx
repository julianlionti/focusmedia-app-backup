import React, { memo, useState } from 'react'
import { FormControl, IconButton, IInputProps, Input } from 'native-base'
import { useField } from 'formik'
import { StringMap, TOptions } from 'i18next'
import MaterialIcon from '../MaterialIcon'

interface Props extends Omit<IInputProps, 'placeholder'> {
  id: string
  title: string | TOptions<StringMap> | undefined
  helper?: string | TOptions<StringMap> | undefined
  placeholder?: string | TOptions<StringMap> | undefined
  secure?: boolean
}

const TextInput: React.FC<Props> = memo((props) => {
  const { id, title, helper, placeholder, secure, ...inputProps } = props
  const [{ value }, { error, touched }, { setValue }] = useField(id)
  const [isSecure, setSecure] = useState(secure)

  return (
    <FormControl isInvalid={!!error && touched}>
      <FormControl.Label>{title}</FormControl.Label>
      <Input
        {...inputProps}
        isFullWidth={inputProps.isFullWidth !== undefined ? inputProps.isFullWidth : true}
        value={value}
        onChangeText={(text) => {
          setValue(text)
        }}
        placeholder={placeholder as string}
        type={isSecure ? 'password' : undefined}
        InputRightElement={
          secure ? (
            <IconButton size="sm" onPress={() => setSecure((sec) => !sec)}>
              <MaterialIcon
                mt={1}
                ml={1}
                size="sm"
                name={isSecure ? 'visibility' : 'visibility-off'}
              />
            </IconButton>
          ) : undefined
        }
      />
      {!!helper && !error && <FormControl.HelperText>{error || helper}</FormControl.HelperText>}
      {<FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  )
})

export default TextInput
