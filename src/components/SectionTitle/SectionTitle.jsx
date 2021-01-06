import React from 'react'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

const Wrapper = styled.div`
  margin-left: 1rem;
  margin-right: auto;
  width: 90%;
  max-width: 500px;
  ${({ small }) =>
    small &&
    css`
      max-width: 300px;
    `}
`

const Title = styled.h2`
  max-width: 850px;
  padding-left: 0.7rem;
  cursor: pointer;
  align-self: flex-start;
`

const Underline = styled(motion.div)`
  width: 100%;
  transform-origin: left center;
  border-bottom: solid 2px ${({ theme }) => theme.gold};
`

const underlineVariants = {
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
}
export default function SectionTitle({ children, uri, small }) {
  return (
    <Wrapper small={small} to={uri}>
      <Title>{children}</Title>
      <Underline
        variants={underlineVariants}
        initial="hidden"
        animate="visible"
      />
    </Wrapper>
  )
}
