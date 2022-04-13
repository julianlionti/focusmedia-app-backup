import React, { memo } from 'react'
import { FormControl, ITextAreaProps, TextArea as NBTextArea } from 'native-base'
import { useField } from 'formik'
import { StringMap, TOptions } from 'i18next'

interface Props extends Omit<ITextAreaProps, 'placeholder'> {
  id: string
  title: string | TOptions<StringMap> | undefined
  helper?: string | TOptions<StringMap> | undefined
  placeholder?: string | TOptions<StringMap> | undefined
}

const TextArea: React.FC<Props> = memo((props) => {
  const { id, title, helper, placeholder, ...inputProps } = props
  const [{ value }, { error, touched }, { setValue }] = useField(id)

  return (
    <FormControl isInvalid={!!error && touched}>
      <FormControl.Label>{title}</FormControl.Label>
      <NBTextArea
        {...inputProps}
        isFullWidth={inputProps.isFullWidth !== undefined ? inputProps.isFullWidth : true}
        value={value}
        onChangeText={(text) => {
          setValue(text)
        }}
        placeholder={placeholder as string}
      />
      {!!helper && !error && <FormControl.HelperText>{error || helper}</FormControl.HelperText>}
      {!!error && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  )
})

export default TextArea
