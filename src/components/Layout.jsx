import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import { defaultTheme } from './Themes/Themes'

import MobileHeader from './MobileHeader'
import Footer from './Footer'

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'

const GlobalStyle = createGlobalStyle`
  ${reset}

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
    @media (min-width: 768px) {
      font-size: 60px;
    }
  }

  h3 {
    font-size: 25px;

    @media (min-width: 768px) {
      font-size: 60px;
    }
  }

  h4 {
    font-size: 25px;
  }

  span {
      font-size: 14px;
      font-family: Jost, sansf-serif;
      font-weight: 300;

      @media (min-width: 768px) {
        font-size: 25px;
      }
  }
  p {
    font-family: Jost, sansf-serif;
    font-weight: 200;
    line-height: 2;
    font-size: 15px;
    color: ${({ theme }) => theme.black};
    margin: 45px 30px;
  }

  a {
    text-decoration: none;
    font-family: Jost, sans-serif;
  }

  li {
    font-family: Jost, sans-serif;
  }

  input {
    font-family: Jost, sans-serif;
    font-size: 14px;
    
  }
  button {
    font-family: Jost, sans-serif;
  }

  .logo {
  height: 200px;
  overflow: visible;
  }
  position: relative;

  :root {
  --swiper-navigation-color: ${({ theme }) => theme.black};
  --swiper-navigation-size: 35px;
  }

  .swiper-button-disabled {
    display: none;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
const Layout = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <Container>
      <MobileHeader />
      {children}
      <Footer />
    </Container>
  </ThemeProvider>
)

export default Layout
