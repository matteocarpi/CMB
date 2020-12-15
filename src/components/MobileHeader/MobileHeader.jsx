import React from 'react'
import styled from 'styled-components'

import LogoSVG from '../../assets/logo/logo-full.svg'
import BurgerSVG from '../../assets/icons/burger.svg'

const Container = styled.header`
  position: sticky;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(LogoSVG)``

const Burger = styled(BurgerSVG)``

export default function MobileHeader() {
  return (
    <Container>
      <Logo />
      <Burger />
    </Container>
  )
}
