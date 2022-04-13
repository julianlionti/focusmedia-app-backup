// import { Theme } from '@emotion/react'
import { extendTheme } from 'native-base'
import Config from '../utils/Config'
import EventHelpers from '../utils/eventHelper'

export const eventHeaderHeight = 90
const darkTheme = extendTheme({
  colors: {
    primary: EventHelpers.getColorPallete(Config.APP_NAME)
  },
  config: {
    initialColorMode: 'dark'
  },
  fontConfig: {
    Roboto: {
      100: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic'
      },
      200: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic'
      },
      300: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic'
      },
      400: {
        normal: 'Roboto-Regular',
        italic: 'Roboto-Italic'
      },
      500: {
        normal: 'Roboto-Medium'
      },
      600: {
        normal: 'Roboto-Medium',
        italic: 'Roboto-MediumItalic'
      }
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto'
  },
  components: {
    View: {
      baseStyle: {
        backgroundColor: 'gray.800'
      }
    },
    Button: {}
  }
})

export type DarkTheme = typeof darkTheme
export default darkTheme
