import { createGlobalStyle } from 'styled-components'

import SinkinSansBold from '../fonts/SinkinSans-700Bold-webfont.woff'
import SinkinSansLight from '../fonts/SinkinSans-200XLight-webfont.woff'
import SinkinSansRegular from '../fonts/SinkinSans-400Regular-webfont.woff'

import theme from './theme'

export const GlobalStyle = createGlobalStyle`
  

  @font-face {
    font-family: 'SinkinSansRegular';
    src: url(${SinkinSansRegular}) format('woff2');
    font-style: normal;
  }

  @font-face {
    font-family: 'SinkinSansBold';
    src: url(${SinkinSansBold}) format('woff2');
    font-style: normal;
  }

  @font-face {
    font-family: 'SinkinSansLight';
    src: url(${SinkinSansLight}) format('woff2');
    font-style: normal;
  }

  body {
    font-family: 'SinkinSansRegular', sans-serif;
    color: ${theme.TEXT_COLOR};
    height: 100vh;
  }

  #root {
    height: 100vh;
  }
`
