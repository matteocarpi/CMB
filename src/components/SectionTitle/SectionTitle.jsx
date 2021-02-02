import React from 'react'
import { navigate } from 'gatsby'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

const Wrapper = styled.button`
  text-align: left;
  margin-right: auto;
  margin-left: 1rem;
  padding-left: 0;
  ${({ long, longer }) =>
    !long &&
    !longer &&
    css`
      max-width: 500px;
    `}

  ${({ small }) =>
    small &&
    css`
      max-width: 300px;
    `}

  ${({ uri }) =>
    !uri &&
    css`
      cursor: default;
    `}

    ${({ main }) =>
    main &&
    css`
      min-width: 50%;
      margin-left: 2rem;
    `}
    
    ${({ sub }) =>
    sub &&
    css`
      width: 50%;
      max-width: 240px;
    `}

    ${({ longer }) =>
    longer &&
    css`
      width: 80%;
    `}
`

const Title = styled.h2`
  cursor: pointer;
  align-self: flex-start;
  font-size: calc(22px + 2vw);
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

    ${({ long, longer }) =>
    !long &&
    !longer &&
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
  main,
  sub,
  className,
  longer,
}) {
  return (
    <Wrapper
      className={className}
      small={small}
      onClick={e => (uri ? navigate(uri) : e.preventDefault())}
      uri={uri}
      long={long}
      main={main}
      sub={sub}
      longer={longer}
    >
      <Title longer={longer} long={long} medium={medium} tiny={tiny}>
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
