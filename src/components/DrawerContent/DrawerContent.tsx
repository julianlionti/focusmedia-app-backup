import React from 'react'
import { Box, Divider, FlatList, Image, View, VStack } from 'native-base'
import useDrawerContent from './useDrawerContent'
import DrawerListItem from '../DrawerListItem'
import { Text } from 'native-base'
import LogoBlanco from '../../assets/images/logo-blanco.png'
import { SafeAreaView, ScrollView } from 'react-native'
import normalize from 'react-native-normalize'
import EventHelpers from '../../utils/eventHelper'

// const LogoImage = styled.Image`
//   height: 80px;
//   width: 120px;
// `

const Drawer: React.FC = () => {
  const { menuOptions, t, address, contact, socialNetworks, selected } = useDrawerContent()
  return (
    <SafeAreaView>
      <View bgColor={'gray.500'} height={'full'}>
        <View bgColor={'white'}>
          <FlatList
            keyExtractor={(item) => item.title}
            // ItemSeparatorComponent={() => <Divider />}
            data={menuOptions}
            renderItem={({ item }) => (
              <DrawerListItem selected={selected === item.screen} {...item} />
            )}
          />
        </View>
        <Divider />
        <ScrollView>
          <VStack space="1" pt="1" mx="1">
            <Text>{t('menu.organize')?.toString()}</Text>
            <VStack alignItems={'center'}>
              <Box py="1">
                <Image
                  alt={EventHelpers.getTitle()}
                  width={normalize(100, 'width')}
                  height={normalize(60, 'height')}
                  source={LogoBlanco}
                  resizeMode="contain"
                />
              </Box>
              <Text textAlign="center">{address}</Text>
              <Text textAlign="center">{contact}</Text>
              <Text textAlign="center">{socialNetworks}</Text>
            </VStack>
          </VStack>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Drawer
