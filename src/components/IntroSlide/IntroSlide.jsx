import React, { useEffect } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import ColoredBackgroundImage from '../ColoredBackgroundImage'

const entranceSpeed = 1
const pause = 2

const lineVariants = {
  start: {
    originY: '0%',
    translateY: '250%',
    scaleY: 5.8,
  },
  enter: {
    originY: '0%',
    scaleY: [5.8, 5.8, 1],
    translateY: ['250%', '0%', '0%'],
    transition: {
      duration: entranceSpeed,
      ease: 'easeInOut',
    },
  },
  exit: {
    originY: '100%',
    scaleY: [1, 1, 1, 3, 3],
    translateY: ['0%', '0%', '0%', '0%', '-250%'],
    transition: {
      duration: entranceSpeed,
      ease: 'easeInOut',
    },
    transitionEnd: {
      originY: '0%',
      translateY: '250%',
      scaleY: 5.8,
    },
  },
}

const Container = styled(ColoredBackgroundImage)`
  height: 80vh;
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
`

export default function IntroSlide({ img }) {
  const smallControls = useAnimation()
  const mediumControls = useAnimation()
  const largeControls = useAnimation()

  useEffect(() => {
    const logoAnimation = () =>
      smallControls
        .start('enter')
        .then(() => mediumControls.start('enter'))
        .then(() => largeControls.start('enter'))
        .then(() =>
          setTimeout(() => {
            smallControls
              .start('exit')
              .then(() => mediumControls.start('exit'))
              .then(() => largeControls.start('exit'))
              .then(() =>
                setTimeout(() => {
                  logoAnimation()
                }, pause * 500),
              )
          }, pause * 1000),
        )

    logoAnimation()
  })

  return (
    <Container fluid={img} opacity={0} backgroundPosition="left center">
      <LogoContainer backgroundColor="rgba(9, 15, 45, 0.9)">
        <motion.svg
          className="logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 197.58 326.96"
        >
          <motion.path
            style={{ transform: 'translateY(250%)' }}
            fill="#ce9f12"
            d="M0 105.32 0 0 4.67 5.14 4.67 100.19 0 105.32z"
            variants={lineVariants}
            initial="start"
            animate={smallControls}
          />
          <motion.path
            style={{ transform: 'translateY(250%)' }}
            variants={lineVariants}
            initial="start"
            animate={mediumControls}
            fill="#ce9f12"
            d="M99.15 217.97 99.15 7.72 92.13 0 92.13 225.7 99.15 217.97z"
          />
          <motion.path
            style={{ transform: 'translateY(250%)' }}
            variants={lineVariants}
            initial="start"
            animate={largeControls}
            fill="#ce9f12"
            d="M197.58 10.29 197.58 316.69 188.23 326.96 188.23 0 197.58 10.29z"
          />
        </motion.svg>
      </LogoContainer>
    </Container>
  )
}
