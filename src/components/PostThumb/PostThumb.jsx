import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import styled, { css } from 'styled-components'

import useViewportWidth from '../../hooks/useViewportWidth'
import ImageCut from '../ImageCut'
import PlusIcon from '../../assets/icons/plus.svg'
import Lg from '../../assets/logo/logo-lines.svg'

const Container = styled(Link)`
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

const Image = styled(ImageCut)`
  max-height: 300px;
  ${({ large }) =>
    !large &&
    css`
      max-width: 300px;
    `}
`

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

const cutWidthSmall = Math.sqrt(25 ** 2 * 2)
const cutWidthBig = Math.sqrt(50 ** 2 * 2)

const Title = styled.span`
  font-size: 20px;
  max-width: calc(100% - ${cutWidthSmall}px);

  @media (min-width: 768px) {
    max-width: calc(100% - ${cutWidthBig}px);
  }
`

const Plus = styled(PlusIcon)`
  path {
    fill: ${({ theme }) => theme.black};
  }
  width: 30px;
`

const Footer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
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
          dr
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
          dr
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
