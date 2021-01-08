/* eslint-disable import/prefer-default-export */
import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ShortSvg = styled(motion.svg)`
  height: 30%;
`
const ShortPath = styled(motion.path)`
  fill: ${({ theme }) => theme.gold};
  transform: scaleX(1.9) !important;
`
const MediumSvg = styled(motion.svg)`
  height: 70%;
`
const MediumPath = styled(motion.path)`
  fill: ${({ theme }) => theme.gold};
  width: 6px;
`
const LongSvg = styled(motion.svg)`
  width: 10px;
`
const LongPath = styled(motion.path)`
  fill: ${({ theme }) => theme.gold};
  overflow: visible;
`

export const Short = props => (
  <ShortSvg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 11.3 395.07"
  >
    <ShortPath
      id="Path_37"
      data-name="Path 37"
      d="M0,0V395.07l11.3-12.42V12.44Z"
      {...props}
    />
  </ShortSvg>
)

export const Medium = props => (
  <MediumSvg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 11.3 395.07"
  >
    <MediumPath
      id="Path_37"
      data-name="Path 37"
      d="M0,0V395.07l11.3-12.42V12.44Z"
      {...props}
    />
  </MediumSvg>
)
export const Long = props => (
  <LongSvg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 11.3 395.07"
  >
    <LongPath
      id="Path_37"
      data-name="Path 37"
      d="M0,0V395.07l11.3-12.42V12.44Z"
      {...props}
    />
  </LongSvg>
)
