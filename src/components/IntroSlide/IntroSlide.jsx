import React from 'react'
import styled from 'styled-components'
import ColoredBackgroundImage from '../ColoredBackgroundImage'

import SlicedLogo from '../SlicedLogo'

const Container = styled(ColoredBackgroundImage)`
  height: calc(85vh - 100px);
  width: 100%;
  text-align: right;
  position: fixed;
  @media (min-width: 768px) {
    width: 55%;
    margin-left: auto;
  }
`

const LogoContainer = styled.section`
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .logo {
    width: 60%;
  }
`

export default function IntroSlide({ img }) {
  return (
    <Container fluid={img} opacity={0} backgroundPosition="left center">
      <LogoContainer backgroundColor="rgba(9, 15, 45, 0.9)">
        <SlicedLogo />
      </LogoContainer>
    </Container>
  )
}
