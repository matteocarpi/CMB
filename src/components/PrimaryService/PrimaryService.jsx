import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Image from '../ImageCut'
import PlusIcon from '../../assets/icons/plus.svg'
import Lg from '../../assets/logo/logo-lines.svg'

const Container = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${({ reverseRow }) =>
    reverseRow &&
    css`
      flex-direction: row-reverse;
    `}
`

const ImageContainer = styled.div`
  position: relative;
  width: 30%;
  margin-bottom: -1px;
  z-index: -1;
  @media (min-width: 768px) {
    width: 50%;
  }
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

const Logo = styled(Lg)`
  width: 20%;
`

const Img = styled(Image)``

const Text = styled.section`
  width: 65%;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 50%;
  }
`
const Title = styled.h3``
const Description = styled.article`
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
  description,
  image,
  index,
  servicesNumber,
  uri,
}) {
  const isRight = index % 2 !== 0
  const isLeft = !isRight

  const ur = isLeft && index !== 0
  const dr = isLeft && index !== servicesNumber - 1
  const ul = isRight && index !== 0
  const dl = isRight && index !== servicesNumber - 1

  const [isHover, setisHover] = useState(false)

  return (
    <Container
      reverseRow={isRight}
      onMouseEnter={() => setisHover(true)}
      onMouseLeave={() => setisHover(false)}
      to={uri}
    >
      <ImageContainer>
        <Img dr={dr} dl={dl} ul={ul} ur={ur} fluid={image} isHover={isHover} />

        {isHover && (
          <Overlay>
            <Logo />
          </Overlay>
        )}
      </ImageContainer>
      <Text>
        <Title>{title}</Title>
        <Description dangerouslySetInnerHTML={{ __html: description }} />

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
