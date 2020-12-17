import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAnimation } from 'framer-motion'
import { Short, Medium, Long } from './Lines'
import {
  shortLineVariants,
  mediumLineVariants,
  longLineVariants,
} from './animationVariants'

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 150px;
  height: 250px;
  margin: 0 auto;
`

export default function SlicedLogo() {
  const smallControls = useAnimation()
  const mediumControls = useAnimation()
  const longControls = useAnimation()

  const pause = 2

  useEffect(() => {
    const logoAnimation = () =>
      smallControls
        .start('enter')
        .then(() => mediumControls.start('enter'))
        .then(() => longControls.start('enter'))
        .then(() =>
          setTimeout(() => {
            smallControls
              .start('exit')
              .then(() => mediumControls.start('exit'))
              .then(() => longControls.start('exit'))
              .then(() =>
                setTimeout(() => {
                  logoAnimation()
                }, pause * 1000),
              )
          }, pause * 1000),
        )
    logoAnimation()
  })

  return (
    <Container>
      <Short
        variants={shortLineVariants}
        initial="start"
        animate={smallControls}
      />
      <Medium
        variants={mediumLineVariants}
        initial="start"
        animate={mediumControls}
      />
      <Long
        variants={longLineVariants}
        initial="start"
        animate={longControls}
      />
    </Container>
  )
}
