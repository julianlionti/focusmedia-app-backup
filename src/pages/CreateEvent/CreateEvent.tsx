import React from 'react'
import { Button, Heading, ScrollView, VStack } from 'native-base'
import PageContainer from '../../components/PageContainer'
import EventHeader from '../../components/EventHeader/EventHeader'
import useCreateEvent from './useCreateEvent'
import { Formik } from 'formik'
import TextInput from '../../components/TextInput/TextInput'
import Switch from '../../components/Switch/Switch'
import TextArea from '../../components/TextArea/TextArea'
import FormButtons from '../../components/FormButtons/FormButtons'
import Dropdown from '../../components/Dropdown/Dropdown'
import TimeRange from '../../components/TimeRange/TimeRange'
import CustomModal from '../../components/CustomModal/CustomModal'
import Loading from '../../components/Loading'

const CreateEvent = () => {
  const {
    t,
    initialValues,
    onSubmitEvent,
    days,
    validationSchema,
    alreadyExists,
    hasToAskForCalendarPermission,
    hasGrantedCalendarPermission,
    isPrepared,
    closePermissionModal,
    closeAlreadyExists,
    askForPermissions
  } = useCreateEvent()
  return (
    <PageContainer>
      <EventHeader canGoBack />
      <Heading py={2} mx={2}>
        {t('onetoone.new_event')}
      </Heading>
      {!isPrepared && <Loading full />}
      {isPrepared && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitEvent}
          validationSchema={validationSchema}
        >
          <ScrollView>
            <VStack p={2} space={2}>
              <TextInput
                id="title"
                title={t('onetoone.event_title')}
                placeholder={t('onetoone.event_title_placeholder')}
              />
              <TextArea
                id="description"
                title={t('onetoone.event_description')}
                placeholder={t('onetoone.event_description_placehoder')}
              />
              <Dropdown
                id="day"
                title={t('onetoone.choose_day')}
                options={days}
                onChange={(opt, setFieldValue) => {
                  setFieldValue('day', opt.data.day)
                  setFieldValue('date', opt.data.date)
                }}
              />
              <TimeRange id="range" />
              <Switch
                // onTouchEnd={() => {
                //   console.log('Touched')
                // }}
                id="eventAlarm"
                disabled={!hasGrantedCalendarPermission}
                title={t('onetoone.create_calendar_event')}
              />
              <FormButtons />
            </VStack>
          </ScrollView>
        </Formik>
      )}
      <CustomModal
        title={t('onetoone.calendar_permission_title')}
        description={t('onetoone.calendar_permission_description')}
        actionBtn={<Button onPress={askForPermissions}>OK</Button>}
        isOpen={hasToAskForCalendarPermission || false}
        onClose={closePermissionModal}
      />
      <CustomModal
        title={t('onetoone.already_exists_title')}
        description={t('onetoone.already_exists_description')}
        isOpen={alreadyExists}
        onClose={closeAlreadyExists}
        actionBtn={
          <Button color="primary.500" onPress={closeAlreadyExists}>
            OK
          </Button>
        }
        noCancel
      />
    </PageContainer>
  )
}

export default CreateEvent
