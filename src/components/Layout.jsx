import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import { defaultTheme } from './Themes/Themes'

import Header from './Header'
import Footer from './Footer'

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import './typography.css'

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    color: ${({ theme }) => theme.black};
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
  }
  body {
    box-sizing: border-box;
  }

  div {
    font-family: Jost, sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4 {
    font-family: 'Cinzel', serif;
    color: ${({ theme }) => theme.black};
    line-height: 1.2;
    text-transform: uppercase;
  }
  

  h1 {
    font-size: 40px;
    margin: 15px;

    @media (min-width: 768px) {
      font-size: 60px;
    }
  }

  h2 {
    font-size: 47px;
    @media (min-width: 768px) {
      font-size: 40px;
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

    ${'' /* @media (min-width: 768px) {
      font-size: 40px;
    } */}
  }

  h5, h6 {
    font-family: Jost, sans-serif;
    color: ${({ theme }) => theme.black};
    line-height: 1.2;
  }

  h5 {
    font-size: 18px;
    font-weight: 200;
    text-transform: uppercase;
    @media (min-width: 768px) {
      font-size: 25px;
    }
  }

  h6 {
    font-size: 14px;
    font-weight: 200;

    @media (min-width: 768px) {
      font-size: 18px;
    }
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
    font-weight: 300;
    line-height: 2;
    font-size: 20px;
    color: ${({ theme }) => theme.black};
    margin: 30px 30px 0 30px;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: 400;
  }

  a {
    text-decoration: none;
    font-family: Jost, sans-serif;
    color: ${({ theme }) => theme.black};
    &:visited {
    color: ${({ theme }) => theme.black};
    }
  }

  li {
    font-family: Jost, sans-serif;
    font-weight: 300;
    line-height: 2;
    font-size: 20px;
    margin-left: 2rem;
    color: ${({ theme }) => theme.black};
  }

  ul {
    li {
      list-style: disc;
    }
  }

  input, textarea {
    font-family: Jost, sans-serif;
    font-size: 14px;
  }
  button {
    cursor: pointer;
    font-family: Jost, sans-serif;
    background-color: transparent;
    border: none;
    font-weight: 200;
    &:focus {
      outline: none;
    }
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
  padding-top: 100px;
`

const Content = styled.div`
  margin-top: 100px;
`
const Layout = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <Container>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Container>
  </ThemeProvider>
)

export default Layout
