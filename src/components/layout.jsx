import React from 'react'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
`

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    {children}
  </>
)

export default Layout
