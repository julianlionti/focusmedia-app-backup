import { Heading, Text, VStack } from 'native-base'
import React from 'react'
import PageContainer from '../../components/PageContainer'
import useDownloadEvent from './useDownloadEvent'
import { Circle } from 'react-native-progress'
import { SafeAreaView } from 'react-native'

const DownloadEvent = () => {
  const { t, event, percentage, isDownloading, downloadColor, unzippingColor, isUnzipping } =
    useDownloadEvent()
  return (
    <PageContainer>
      <SafeAreaView>
        <VStack space={8} alignItems={'center'}>
          <Heading>{event.name}</Heading>
          {(isDownloading || isUnzipping) && [
            <Circle
              key="circle"
              progress={percentage}
              color={isDownloading ? downloadColor : unzippingColor}
              size={180}
              showsText
              indeterminate={isUnzipping}
            />,
            <Text key="text" textAlign={'center'}>
              {t(isDownloading ? 'download.information' : 'download.unzipping')}
            </Text>
          ]}
        </VStack>
      </SafeAreaView>
    </PageContainer>
  )
}

export default DownloadEvent
