import React from 'react'
import styled from 'styled-components'
import Download from '../Download'

const Container = styled.div`
  text-align: center;
  margin: 1rem;
  h5 {
    margin-bottom: 1rem;
    font-size: 22px;
  }

  @media (min-width: 768px) {
    margin: 2rem;
  }
`

export default function Attachment({ title, url }) {
  return (
    <Container>
      <h5>{title}</h5>
      <Download url={url} />
    </Container>
  )
}
