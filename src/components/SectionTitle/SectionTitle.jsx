import React from 'react'
import styled from 'styled-components'

const Title = styled.h2`
  width: 90%;
  max-width: 850px;
  border-bottom: solid 2px ${({ theme }) => theme.gold};
  padding-left: 0.7rem;
  margin-left: 1rem;
  cursor: pointer;
  align-self: flex-start;
`

export default function SectionTitle({ children, onClick }) {
  return <Title onClick={onClick}>{children}</Title>
}
