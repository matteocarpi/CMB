import React from 'react'
import { navigate } from 'gatsby'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

const Wrapper = styled.button`
  text-align: left;
  margin-left: 1rem;
  margin-right: auto;
  padding-left: 0;
  /* padding-right: 2rem; */
  ${({ long }) =>
    !long &&
    css`
      max-width: 500px;
    `}

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
  cursor: pointer;
  align-self: flex-start;

  ${({ tiny }) =>
    tiny &&
    css`
      font-size: 30px;
    `}

  ${({ medium }) =>
    medium &&
    css`
      @media (min-width: 768px) {
        font-size: 40px;
      }
      font-size: 30px;
    `}

    ${({ long }) =>
    !long &&
    css`
      max-width: 850px;
    `}
`

const Underline = styled(motion.div)`
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
export default function SectionTitle({
  children,
  uri,
  medium,
  small,
  tiny,
  long,
}) {
  return (
    <Wrapper
      small={small}
      onClick={e => (uri ? navigate(uri) : e.preventDefault())}
      uri={uri}
      long={long}
    >
      <Title long={long} medium={medium} tiny={tiny}>
        {children}
      </Title>
      <Underline
        variants={underlineVariants}
        initial="hidden"
        animate="visible"
        tiny={tiny}
      />
    </Wrapper>
  )
}
