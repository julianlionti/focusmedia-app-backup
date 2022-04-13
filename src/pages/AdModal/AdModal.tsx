import { Pressable, Button, IconButton, Image, Box } from 'native-base'
import React from 'react'
import normalize from 'react-native-normalize'
import MaterialIcon from '../../components/MaterialIcon'
import PageContainer from '../../components/PageContainer'
import { useAdModal } from './useAdModal'

const AdModal = () => {
  const { t, image, openAd, closeAd } = useAdModal()
  return (
    <PageContainer>
      <Box flex={1}>
        <Box mr={2} mt={2} alignItems={'flex-end'}>
          <IconButton onPress={closeAd}>
            <MaterialIcon name="close" />
          </IconButton>
        </Box>
        <Box flex={1}>
          <Pressable onPress={openAd}>
            <Image
              resizeMode="contain"
              alt={image}
              width={'100%'}
              height={'100%'}
              source={{ uri: image }}
            />
          </Pressable>
        </Box>
        <Box minHeight={normalize(80, 'height')}>
          <Button
            variant="link"
            color={'primary.900'}
            onPress={openAd}
            position="absolute"
            right={4}
            bottom={4}
          >
            {t('home.ads_see_more')?.toUpperCase()}
          </Button>
        </Box>
      </Box>
    </PageContainer>
  )
}

export default AdModal
