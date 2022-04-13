/**
 * @format
 */
import 'react-native-gesture-handler'

import { AppRegistry, LogBox } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import { initTranslations } from './src/translations'
import messaging from '@react-native-firebase/messaging'
import { backgroundMessageHandler } from './src/services/messaging'

initTranslations()

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system",
  'Require cycle:',
  'new NativeEventEmitter'
])

messaging().setBackgroundMessageHandler(backgroundMessageHandler)
AppRegistry.registerComponent(appName, () => App)
