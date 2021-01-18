import React from 'react'
import { navigate } from 'gatsby'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

const Wrapper = styled.button`
  text-align: left;
  margin-left: 1rem;
  margin-right: auto;
  width: 90%;
  max-width: 500px;
  padding-left: 0;
  ${({ small }) =>
    small &&
    css`
      max-width: 300px;
    `}

  ${({ uri }) =>
    uri ||
    css`
      cursor: default;
    `}
`

const Title = styled.h2`
  max-width: 850px;
  cursor: pointer;
  align-self: flex-start;

  ${({ tiny }) =>
    tiny &&
    css`
      font-size: 30px;
    `}
`

const Underline = styled(motion.div)`
  width: 100%;
  margin-top: 1rem;
  transform-origin: left center;
  border-bottom: solid 2px ${({ theme }) => theme.gold};

  ${({ tiny }) =>
    tiny &&
    css`
      border-bottom: none;
    `}
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
export default function SectionTitle({ children, uri, small, tiny }) {
  return (
    <Wrapper
      small={small}
      onClick={e => (uri ? navigate(uri) : e.preventDefault())}
      uri={uri}
    >
      <Title tiny={tiny}>{children}</Title>
      <Underline
        variants={underlineVariants}
        initial="hidden"
        animate="visible"
        tiny={tiny}
      />
    </Wrapper>
  )
}
