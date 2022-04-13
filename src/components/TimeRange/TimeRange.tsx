import React from 'react'
import { Pressable, View, FormControl, HStack, Input } from 'native-base'
import useTimeRange from './useTimeRange'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

export interface TimeRangeProps {
  id: string
}

const TimeRange: React.FC<TimeRangeProps> = (props) => {
  const { t, showPicker, setShowPicker, onChangePicker, start, end, error, isInvalid } =
    useTimeRange(props)
  return (
    <FormControl isInvalid={isInvalid}>
      <HStack space={2}>
        <Pressable flex={1} onPress={() => setShowPicker('start')}>
          <View pointerEvents="none">
            <FormControl isInvalid={isInvalid}>
              <FormControl.Label isInvalid={isInvalid}>
                {t('onetoone.event_start')}
              </FormControl.Label>
              <Input
                value={start ? moment(start).format('HH:mm') : ''}
                placeholder={t('onetoone.event_start_placeholder') as string}
                editable={false}
              />
            </FormControl>
          </View>
        </Pressable>
        <Pressable flex={1} onPress={() => setShowPicker('end')}>
          <View pointerEvents="none">
            <FormControl isInvalid={isInvalid}>
              <FormControl.Label>{t('onetoone.event_end')}</FormControl.Label>
              <Input
                value={end ? moment(end).format('HH:mm') : ''}
                placeholder={t('onetoone.event_end_placeholder') as string}
                editable={false}
              />
            </FormControl>
          </View>
        </Pressable>
      </HStack>
      {!!showPicker && (
        <DateTimePicker
          value={start || new Date()}
          mode="time"
          is24Hour
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(ev: any, date: any) => {
            onChangePicker(date)
          }}
        />
      )}
      <FormControl.ErrorMessage>{error.end}</FormControl.ErrorMessage>
    </FormControl>
  )
}

export default TimeRange
