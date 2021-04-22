import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import styled, { css } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import useViewportWidth from '../../hooks/useViewportWidth'
import Image from '../ImageCut'
import PlusIcon from '../../assets/icons/plus.svg'
import Lg from '../../assets/logo/logo-lines.svg'

const breakPoint = 1000

const Container = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: default;
  ${({ reverseRow }) =>
    reverseRow &&
    css`
      flex-direction: row-reverse;
    `}
`
const ContainerMobile = styled.button`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 4rem;
  }
  ${({ reverseRow }) =>
    reverseRow &&
    css`
      align-items: flex-end;
    `}
`

const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 90%;
  margin-bottom: -1px;
  z-index: 10;
  @media (min-width: ${breakPoint}px) {
    width: 50%;
  }
`

const Overlay = styled.div`
  position: absolute;
  background-color: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.transparentNavy};
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

const Img = styled(Image)`
  @media (max-width: 767px) {
    align-self: flex-start;
  }
  @media (min-width: 768px) {
    min-height: 500px;
  }
`

const Text = styled.section`
  cursor: pointer;
  width: 90%;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    p {
      text-align: center;
    }

    p:last-child {
      display: none;
    }
  }
  @media (min-width: ${breakPoint}px) {
    width: 60%;
    padding: 2rem 4rem 2rem 2rem;
  }
`

const Title = styled.h3`
  text-align: left;
  font-size: 35px;
  color: ${({ white }) => white && 'white'};
  text-shadow: ${({ white }) => white && '0px 0px 10px rgba(0,0,0,0.2)'};
  @media (max-width: 767px) {
    text-align: center;
  }
  @media (min-width: ${breakPoint}px) {
    font-size: 45px;
  }
`

const Quote = styled.article`
  text-align: left;
  p {
    margin: 1rem 0;
  }
`

const Plus = styled(PlusIcon)`
  align-self: flex-end;
  margin: 0;
  path {
    fill: black;
  }
  ${({ isHover }) =>
    isHover &&
    css`
      path {
        stroke: ${({ theme }) => theme.gold};
        fill: ${({ theme }) => theme.gold};
      }
    `}
`

const Decorations = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  ${({ isRight }) =>
    isRight &&
    css`
      flex-direction: row-reverse;
    `};
`

const Line = styled(motion.div)`
  width: 100%;
  border: solid 1px ${({ theme }) => theme.gold};

  ${({ isRight }) =>
    isRight &&
    css`
      margin-left: 3rem;
      transform-origin: right center;
    `}

  ${({ isRight }) =>
    !isRight &&
    css`
      margin-right: 3rem;
      transform-origin: left center;
    `}
`

const lineApparence = 0.5

const rightLineVariants = {
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: lineApparence,
      ease: 'easeInOut',
    },
  },
  exit: {
    scaleX: 0,
    transition: {
      duration: lineApparence,
      ease: 'easeInOut',
    },
  },
}

const leftLineVariants = {
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: lineApparence,
      ease: 'easeInOut',
    },
  },
  exit: {
    scaleX: 0,
    transition: {
      duration: lineApparence,
      ease: 'easeInOut',
    },
  },
}

export default function PrimaryService({
  title,
  citazione,
  image,
  index,
  servicesNumber,
  uri,
}) {
  const width = useViewportWidth()
  const isMobile = width < breakPoint
  const isRight = index % 2 !== 0
  const isLeft = !isRight

  const ur = isLeft && index !== 0
  const dr = isLeft && index !== servicesNumber - 1
  const ul = isRight && index !== 0
  const dl = isRight && index !== servicesNumber - 1

  const [isHover, setIsHover] = useState(false)

  return isMobile ? (
    <>
      <ContainerMobile
        reverseRow={isRight}
        onClick={() => {
          setIsHover(true)
          setTimeout(() => {
            navigate(uri)
          }, 1000)
        }}
      >
        <ImageContainer
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Img
            dr={dr}
            dl={dl}
            ul={ul}
            ur={ur}
            fluid={{ ...image, aspectRatio: 1 }}
            isHover={isHover}
          />

          {isHover ? (
            <Overlay>
              <Logo />
            </Overlay>
          ) : (
            <Overlay transparent>
              <Title white>{title}</Title>
            </Overlay>
          )}
        </ImageContainer>
        <Text
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Quote dangerouslySetInnerHTML={{ __html: citazione }} />

          <Decorations isRight={isRight}>
            <AnimatePresence>
              {isHover && (
                <Line
                  isHover={isHover}
                  isRight={isRight}
                  variants={isRight ? rightLineVariants : leftLineVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
              )}
            </AnimatePresence>
            <Plus isHover={isHover} to={uri} />
          </Decorations>
        </Text>
      </ContainerMobile>
    </>
  ) : (
    <Container reverseRow={isRight} to={uri}>
      <ImageContainer
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Img
          dr={dr}
          dl={dl}
          ul={ul}
          ur={ur}
          fluid={{ ...image, aspectRatio: 1 }}
          isHover={isHover}
        />

        {isHover && (
          <Overlay>
            <Logo />
          </Overlay>
        )}
      </ImageContainer>
      <Text
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Title>{title}</Title>
        <Quote dangerouslySetInnerHTML={{ __html: citazione }} />

        <Decorations isRight={isRight}>
          <AnimatePresence>
            {isHover && (
              <Line
                isHover={isHover}
                isRight={isRight}
                variants={isRight ? rightLineVariants : leftLineVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            )}
          </AnimatePresence>
          <Plus isHover={isHover} to={uri} />
        </Decorations>
      </Text>
    </Container>
  )
}
