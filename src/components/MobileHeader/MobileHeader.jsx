import React from 'react'
import styled from 'styled-components'

import LogoSVG from '../../assets/logo/logo-full-dark.svg'
import BurgerSVG from '../../assets/icons/burger.svg'

const Container = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10000;
  background-color: white;
  border-bottom: solid 1px lightgrey;
`

const Logo = styled(LogoSVG)`
  margin: 15px;
`

const Burger = styled(BurgerSVG)`
  margin: 30px;
`

export default function MobileHeader() {
  return (
    <Container>
      <Logo />
      <Burger />
    </Container>
  )
}
