import React from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

import Img from 'gatsby-background-image'
import Lg from '../../assets/logo/logo-lines.svg'

const Container = styled(motion.div)`
  position: relative;
  ${({ dr }) =>
    dr &&
    css`
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
          transform: scale(2) rotate(45deg) translate(17.5px, 0px);
        }
      }
    `}
  ${({ dl }) =>
    dl &&
    css`
      &:before {
        content: '';
        z-index: 1;
        width: 50px;
        height: 50px;
        background-color: white;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: rotate(-45deg) translate(-35px, 0px);
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
          left: 0;
          transform: scale(2) rotate(-45deg) translate(-17.5px, 0px);
        }
      }
    `}
    ${({ ur }) =>
    ur &&
    css`
      &:after {
        content: '';
        z-index: 1;
        width: 50px;
        height: 50px;
        background-color: white;
        position: absolute;
        top: 0;
        right: 0;
        transform: rotate(45deg) translate(0px, -35px);
      }
      @media (min-width: 768px) {
        &:after {
          content: '';
          z-index: 1;
          width: 50px;
          height: 50px;
          background-color: white;
          position: absolute;
          top: 0;
          right: 0;
          transform: scale(2) rotate(45deg) translate(0px, -17.5px);
        }
      }
    `}
    ${({ ul }) =>
    ul &&
    css`
      &:after {
        content: '';
        z-index: 1;
        width: 50px;
        height: 50px;
        background-color: white;
        position: absolute;
        top: 0;
        left: 0;
        transform: rotate(45deg) translate(-35px, 0px);
      }
      &:after {
        content: '';
        z-index: 1;
        width: 50px;
        height: 50px;
        background-color: white;
        position: absolute;
        top: 0;
        left: 0;
        transform: scale(2) rotate(45deg) translate(-17.5px, 0px);
      }
    `};
`
const Image = styled(Img)`
  width: 100% !important;

  @media (min-width: 768px) {
    width: 100% !important;
  }
`

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.transparentNavy};
  transition: 2s;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Logo = styled(Lg)`
  width: 20%;
`
// const animationDuration = 1

// const fadeVariants = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: {
//     opacity: 0,
//     transition: {
//       duration: animationDuration,
//       ease: 'easeInOut',
//     },
//   },
//   exit: {
//     opacity: 0,
//     transition: {
//       duration: animationDuration,
//       ease: 'easeInOut',
//     },
//   },
// }

export default function HoverableImage({
  fluid,
  dr,
  dl,
  ur,
  ul,
  isHover,
  className,
}) {
  return (
    <Container dr={dr} dl={dl} ur={ur} ul={ul} className={className}>
      <Image className={className} fluid={fluid}>
        {isHover && (
          <Content
            // TODO Better animation
            // variants={fadeVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Logo />
          </Content>
        )}
      </Image>
    </Container>
  )
}
