import React from 'react'
import styled from 'styled-components'

const Title = styled.h2`
  width: 90%;
  border-bottom: solid 2px ${({ theme }) => theme.gold};
  padding-left: 0.7rem;
`

export default function SectionTitle({ children }) {
  return <Title>{children}</Title>
}
