import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import { defaultTheme } from './Themes/Themes'

import MobileHeader from './MobileHeader'

const GlobalStyle = createGlobalStyle`
  ${reset}
  h1, h2, h3, h4, h5, h6 {
    font-family: Cinzel, serif;
    color: ${({ theme }) => theme.black};
  }

  h1 {
    font-size: 47px;
    margin: 15px;
  }

  h2 {
    font-size: 21px;
  }
  
  span {
      font-family: Jost, sansf-serif;
      font-weight: 300;
  }
  p {
    font-family: Jost, sansf-serif;
    font-weight: 300;
    line-height: 2;
    font-size: 15px;
    color: ${({ theme }) => theme.black};
    margin: 45px 30px;
  }
  .logo {
  height: 200px;
  overflow: visible;
  }
  position: relative;
`

const Layout = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <MobileHeader />
    {children}
  </ThemeProvider>
)

export default Layout
