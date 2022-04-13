import React from 'react'
import { Center, useTheme } from 'native-base'
import { ActivityIndicator } from 'react-native'
import PageContainer from './PageContainer'

interface Props {
  full?: boolean
  Header?: JSX.Element
}

const Loading: React.FC<Props> = (props) => {
  const { full, Header } = props
  const { colors } = useTheme()

  if (full) {
    return (
      <PageContainer>
        {Header}
        <Center flex={1}>
          <ActivityIndicator color={colors.primary[600]} size={'large'} />
        </Center>
      </PageContainer>
    )
  }

  return <ActivityIndicator />
}

export default Loading
