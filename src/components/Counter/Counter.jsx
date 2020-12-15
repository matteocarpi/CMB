import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
`
const Numero = styled.h3`
  font-weight: 700;
`
const Title = styled.span`
  text-transform: uppercase;
  font-size: 7px;
`
export default function Counter({ number = 0, title = 0 }) {
  const [count, setCount] = useState(0)
  const realNumber = Number(number)

  const time = 10
  useEffect(() => {
    if (count < realNumber) {
      setTimeout(() => {
        setCount(count + 1)
      }, time)
    }
  }, [count, realNumber])

  return (
    <Container>
      <Numero>{count}</Numero>
      <Title>{title}</Title>
    </Container>
  )
}
