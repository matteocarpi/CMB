import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import { defaultTheme } from './Themes/Themes'

import MobileHeader from './MobileHeader'

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    transition-duration: 0.5s;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: Cinzel, serif;
    color: ${({ theme }) => theme.black};
    line-height: 1.2;
  }

  h1 {
    font-size: 47px;
    margin: 15px;
  }

  h2 {
    font-size: 37px;
  }

  h3 {
    font-size: 25px;
  }

  h4 {
    font-size: 25px;
  }

  span {
      font-size: 14px;
      font-family: Jost, sansf-serif;
      font-weight: 300;
  }
  p {
    font-family: Jost, sansf-serif;
    font-weight: 200;
    line-height: 2;
    font-size: 15px;
    color: ${({ theme }) => theme.black};
    margin: 45px 30px;
  }

  button {
    font-family: Jost, sans-serif;
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
