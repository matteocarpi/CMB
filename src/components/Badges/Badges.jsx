import React from 'react'
import styled from 'styled-components'
import Counter from '../Counter'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

export default function Badges({ badges }) {
  return (
    <Container>
      {badges.map(badge => (
        <Counter key={badge.title} number={badge.number} title={badge.title} />
      ))}
    </Container>
  )
}
