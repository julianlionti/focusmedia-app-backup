import React from 'react'
import { ISwitchProps, FormControl, HStack, Switch as NBSwitch } from 'native-base'
import { StringMap, TOptions } from 'i18next'
import { useField } from 'formik'

interface Props extends ISwitchProps {
  id: string
  title: string | TOptions<StringMap> | undefined
  onPreChange?: (nextValue: boolean) => boolean
}

const Switch: React.FC<Props> = (props) => {
  const { id, title, onPreChange, ...swithProps } = props
  const [{ value }, , { setValue }] = useField(id)

  return (
    <FormControl>
      <HStack justifyContent={'center'}>
        <FormControl.Label flex={1}>{title}</FormControl.Label>
        <NBSwitch
          {...swithProps}
          value={value}
          onValueChange={(val) => {
            setValue(val)
          }}
          colorScheme="primary"
        />
      </HStack>
    </FormControl>
  )
}

export default Switch
