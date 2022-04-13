import React from 'react'
import {
  Alert,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  PresenceTransition,
  Text,
  VStack
} from 'native-base'
import PageContainer from '../PageContainer'
import { Formik } from 'formik'
import useOnlineAgendaTab from './useOnlineAgendaLogin'
import TextInput from '../TextInput/TextInput'
import { eventHeaderHeight } from '../../themes/darkTheme'
import MaterialIcon from '../MaterialIcon'

const OnlineAgendaLogin = () => {
  const { t, initialState, onLoginSubmit, errorLogin, closeError } = useOnlineAgendaTab()
  return (
    <PageContainer>
      {!!errorLogin && (
        <PresenceTransition
          visible={!!errorLogin}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 250 } }}
        >
          <Box padding={2}>
            <Alert w="100%" status={'error'}>
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                  <HStack flexShrink={1} space={2} alignItems="center">
                    <Alert.Icon />
                    <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                      {t('onetoone.error_title')?.toString()}
                    </Text>
                  </HStack>
                  <IconButton
                    onPress={closeError}
                    variant="unstyled"
                    icon={<MaterialIcon size="3" color="coolGray.600" name="close" />}
                  />
                </HStack>
                <Box pl="6" _text={{ color: 'coolGray.600' }}>
                  {errorLogin === 'Usuario o Password invalidos'
                    ? t('onetoone.error_description')
                    : errorLogin}
                </Box>
              </VStack>
            </Alert>
          </Box>
        </PresenceTransition>
      )}
      <Formik initialValues={initialState} onSubmit={onLoginSubmit}>
        {({ submitForm }) => (
          <Center flex={1} mt={-eventHeaderHeight} p={2}>
            <Heading mb={10} mt={-10} textAlign={'center'}>
              {t('onetoone.login_title')?.toString()}
            </Heading>
            <TextInput title={t('onetoone.username')} id="username" />
            <TextInput title={t('onetoone.password')} id="password" type="password" secure />
            <Button onPress={submitForm} mt={5}>
              {t('onetoone.login')?.toString()}
            </Button>
          </Center>
        )}
      </Formik>
    </PageContainer>
  )
}

export default OnlineAgendaLogin
