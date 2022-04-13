import React from 'react'
import { Icon, IIconProps } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const MaterialIcon: React.FC<IIconProps> = (props) => <Icon {...props} as={MaterialIcons} />

export default MaterialIcon
