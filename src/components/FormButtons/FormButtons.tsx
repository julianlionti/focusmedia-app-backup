import React from 'react'
import { Button, HStack } from 'native-base'
import useFormButtons from './useFormButtons'

const FormButtons = () => {
  const { resetForm, submitForm, t } = useFormButtons()
  return (
    <HStack space={2} justifyContent={'flex-end'} pt="3">
      <Button onPress={() => resetForm()} variant={'link'}>
        {t('onetoone.reset')?.toString()}
      </Button>
      <Button onPress={submitForm}>{t('onetoone.save')?.toString()}</Button>
    </HStack>
  )
}

export default FormButtons
