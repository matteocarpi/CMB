import React from 'react'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import MobileHeader from './MobileHeader'

const GlobalStyle = createGlobalStyle`
  ${reset}
  .logo {
  height: 200px;
  overflow: visible;

  path {
    transform: 
  }
}
`

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <MobileHeader />
    {children}
  </>
)

export default Layout
