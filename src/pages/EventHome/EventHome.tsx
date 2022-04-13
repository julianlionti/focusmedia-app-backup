import { Heading, VStack, ScrollView } from 'native-base'
import React from 'react'
import Carousel from '../../components/Carousel/Carousel'
import EventHeader from '../../components/EventHeader/EventHeader'
import HasToUpdate from '../../components/HasToUpdate/HasToUpdate'
import PageContainer from '../../components/PageContainer'
import useEventHome from './useEventHome'

const EventHome = () => {
  const { t, name, date, place, color } = useEventHome()

  return (
    <PageContainer>
      <EventHeader />
      <ScrollView>
        <HasToUpdate />
        <VStack py={'2'}>
          <VStack alignItems={'center'} pb="3" px="2" space={'2'}>
            <Heading textAlign={'center'}>{date}</Heading>
            <Heading textAlign={'center'} size={'sm'}>
              {place}
            </Heading>
          </VStack>
          <Carousel />
          <VStack alignItems={'center'} p="3" bgColor={color}>
            <Heading size="sm">{t('event.home.welcome')?.toString()}</Heading>
            <Heading size="sm">{name}</Heading>
          </VStack>
        </VStack>
      </ScrollView>
    </PageContainer>
  )
}

export default EventHome
