import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import styled from 'styled-components'

import useViewportWidth from '../../hooks/useViewportWidth'
import ImageCut from '../ImageCut'
import PlusIcon from '../../assets/icons/plus.svg'
import Lg from '../../assets/logo/logo-lines.svg'

const Container = styled(Link)`
  flex-basis: 0;
  flex-grow: 1;
  margin: 30px;
  max-width: 280px;
  &:hover {
    svg {
      path {
        fill: ${({ theme }) => theme.gold};
      }
    }
  }
`
const ContainerButton = styled.button`
  flex-basis: 0;
  flex-grow: 1;
  margin: 30px;

  &:hover {
    svg {
      path {
        fill: ${({ theme }) => theme.gold};
      }
    }
  }
`
const ImageContainer = styled.div`
  position: relative;
`

const Image = styled(ImageCut)``

const Logo = styled(Lg)`
  width: 20%;
`

const Overlay = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.transparentNavy};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.span`
  font-size: 16px;
  padding: 1rem;
`

const Plus = styled(PlusIcon)`
  margin-right: 1rem;
  path {
    fill: white;
  }
  width: 30px;
`

const Footer = styled.div`
  position: relative;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.navy};
  * {
    color: white;
  }

  &:before {
    content: '';
    z-index: 1;
    width: 50px;
    height: 50px;
    background-color: white;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: rotate(45deg) translate(35px, 0px);
  }
  @media (min-width: 768px) {
    &:before {
      content: '';
      z-index: 1;
      width: 50px;
      height: 50px;
      background-color: white;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: scale(1.5) rotate(45deg) translate(26.25px, 0px);
    }
  }
`

export default function PostThumb({
  className,
  image,
  uri,
  title,
  original,
  large,
}) {
  const [isHover, setIsHover] = useState(false)
  const viewportWidth = useViewportWidth()
  const isMobile = viewportWidth < 768

  return isMobile ? (
    <ContainerButton
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={className}
      onClick={() => {
        setIsHover(true)
        setTimeout(() => {
          navigate(`/${uri}`)
        }, 1000)
      }}
    >
      <ImageContainer>
        <Image
          large={large}
          fluid={original ? image : { ...image, aspectRatio: 1 }}
        />
        {isHover && (
          <Overlay>
            <Logo />
          </Overlay>
        )}
      </ImageContainer>
      <Footer>
        <Title>{title}</Title>
        <Plus />
      </Footer>
    </ContainerButton>
  ) : (
    <Container
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={className}
      to={`/${uri}`}
    >
      <ImageContainer>
        <Image
          large={large}
          fluid={original ? image : { ...image, aspectRatio: 1 }}
        />
        {isHover && (
          <Overlay>
            <Logo />
          </Overlay>
        )}
      </ImageContainer>
      <Footer>
        <Title>{title}</Title>
        <Plus />
      </Footer>
    </Container>
  )
}
