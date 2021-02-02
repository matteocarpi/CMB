import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  flex-basis: 0;
  flex-grow: 1;
  margin: 0 1rem;
`
const Numero = styled.h4`
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 43px;
  }
`
const Title = styled.p`
  text-transform: uppercase;
  font-size: 10px;
  line-height: 1;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 16px;
  }
`
export default function Counter({ number = 0, title, visible }) {
  const [count, setCount] = useState(0)
  const realNumber = Number(number)

  const time = 10
  useEffect(() => {
    if (visible) {
      if (count < realNumber) {
        setTimeout(() => {
          setCount(count + 1)
        }, time)
      }
    } else if (count > 0) {
      setCount(0)
    }
  }, [count, realNumber, visible])

  return (
    <Container>
      <Numero>{count}</Numero>
      <Title>{title}</Title>
    </Container>
  )
}
