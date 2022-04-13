import React from 'react'
import { Box, Heading, Image, ScrollView, Text, VStack } from 'native-base'
import PageContainer from '../../components/PageContainer'
import EventHeader from '../../components/EventHeader/EventHeader'
import useWelcome from './useWelcome'
import { parseHtml } from '../../utils/textUtils'
import HasToUpdate from '../../components/HasToUpdate/HasToUpdate'
import normalize from 'react-native-normalize'

const Welcome = () => {
  const { title, welcome, hasImage, image } = useWelcome()
  return (
    <PageContainer>
      <EventHeader />
      <HasToUpdate />

      <ScrollView>
        <VStack space="2">
          {hasImage && (
            <Box p="8" width={'full'} height={normalize(400, 'height')}>
              <Image
                alt="WelcomeImage"
                height={'full'}
                resizeMode="contain"
                source={{ uri: image }}
              />
            </Box>
          )}
          {title && <Heading textAlign={'center'}>{parseHtml(title)}</Heading>}
          <Text p="4">{parseHtml(welcome)}</Text>
        </VStack>
      </ScrollView>
    </PageContainer>
  )
}

export default Welcome
