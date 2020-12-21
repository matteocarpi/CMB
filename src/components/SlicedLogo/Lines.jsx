/* eslint-disable import/prefer-default-export */
import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ShortSvg = styled(motion.svg)`
  height: 30%;
  overflow: visible;
`
const ShortPath = styled(motion.path)`
  fill: ${({ theme }) => theme.gold};
  transform-origin: top;
  transform: translateY(370vh);
`
const MediumSvg = styled(motion.svg)`
  overflow: visible;
  height: 70%;
`
const MediumPath = styled(motion.path)`
  fill: ${({ theme }) => theme.gold};
  transform: translateY(170vh);
`
const LongSvg = styled(motion.svg)`
  overflow: visible;
  width: 8px;
`
const LongPath = styled(motion.path)`
  fill: ${({ theme }) => theme.gold};
  transform: translateY(120vh);
`

export const Short = props => (
  <ShortSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.3 395.07">
    <ShortPath
      id="Path_37"
      data-name="Path 37"
      d="M0,0V395.07l11.3-12.42V12.44Z"
      {...props}
    />
  </ShortSvg>
)

export const Medium = props => (
  <MediumSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.3 395.07">
    <MediumPath
      id="Path_37"
      data-name="Path 37"
      d="M0,0V395.07l11.3-12.42V12.44Z"
      {...props}
    />
  </MediumSvg>
)
export const Long = props => (
  <LongSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.3 395.07">
    <LongPath
      id="Path_37"
      data-name="Path 37"
      d="M0,0V395.07l11.3-12.42V12.44Z"
      {...props}
    />
  </LongSvg>
)
