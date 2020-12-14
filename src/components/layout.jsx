import React from 'react'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import MobileHeader from './MobileHeader'

const GlobalStyle = createGlobalStyle`
  ${reset}
`

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <MobileHeader />
    {children}
  </>
)

export default Layout
