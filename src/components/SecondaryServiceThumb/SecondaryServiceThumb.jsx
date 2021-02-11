import React, { useState, useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import styled, { css } from 'styled-components'
import { motion, useAnimation } from 'framer-motion'

import ImageCut from '../ImageCut'
import Lg from '../../assets/logo/logo-lines.svg'
import useViewportWidth from '../../hooks/useViewportWidth'

const ImageContainer = styled.div`
  position: relative;
`
const Img = styled(ImageCut)``

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

const Logo = styled(Lg)`
  width: 20%;
`
const cutWidthSmall = Math.sqrt(25 ** 2 * 2)
const cutWidthBig = Math.sqrt(50 ** 2 * 2)

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  max-width: calc(100% - ${cutWidthSmall}px);
  @media (min-width: 768px) {
    max-width: calc(100% - ${cutWidthBig}px);
  }
`

const Title = styled.h6`
  margin-top: 0.5rem;
  padding-bottom: 0.4rem;
  text-align: right;
`

const Line = styled(motion.div)`
  width: 100%;
  border-bottom: solid 1px ${({ theme }) => theme.black};
  transform-origin: left center;

  @media (min-width: 768px) {
    border-width: 2px;
  }

  ${({ isHover }) =>
    isHover &&
    css`
      border-color: ${({ theme }) => theme.gold};
    `}
`

const WrapperLink = styled(Link)`
  width: 100%;
  max-width: px;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    margin: 2rem;
    margin-bottom: 4rem;
    width: 28%;
  }
`

const WrapperButton = styled.button`
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    margin: 2rem;
    width: 20%;
  }
`

const duration = 0.5

const lineVariants = {
  initial: {
    scaleX: 0,
    transition: {
      duration: 0,
    },
  },
  hover: {
    scaleX: 1,
    transition: {
      duration,
      ease: 'easeInOut',
    },
  },
  exit: {
    scaleX: 0,
    transition: {
      duration,
      ease: 'easeInOut',
    },
  },
}

export default function SecondaryServiceThumb({ image, title, uri }) {
  const viewportWidth = useViewportWidth()
  const isMobile = viewportWidth < 768

  const [isHover, setIsHover] = useState(false)

  const controls = useAnimation()

  useEffect(() => {
    if (isHover) {
      controls.start('initial').then(() => controls.start('hover'))
    }
  }, [isHover, controls])

  return isMobile ? (
    <WrapperButton
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => {
        setIsHover(true)
        setTimeout(() => {
          navigate(uri)
        }, 1000)
      }}
    >
      <ImageContainer>
        <Img fluid={{ ...image, aspectRatio: 1 }} dr />
        {isHover && (
          <Overlay>
            <Logo />
          </Overlay>
        )}
      </ImageContainer>
      <TitleContainer>
        <Title>{title}</Title>
        <Line isHover={isHover} variants={lineVariants} animate={controls} />
      </TitleContainer>
    </WrapperButton>
  ) : (
    <WrapperLink
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      to={uri}
    >
      <ImageContainer>
        <Img fluid={{ ...image, aspectRatio: 1 }} dr />
        {isHover && (
          <Overlay>
            <Logo />
          </Overlay>
        )}
      </ImageContainer>
      <TitleContainer>
        <Title>{title}</Title>
        <Line isHover={isHover} variants={lineVariants} animate={controls} />
      </TitleContainer>
    </WrapperLink>
  )
}
