import React from 'react'
import styled from 'styled-components'
import Download from '../Download'

const Container = styled.div`
  text-align: center;
  margin: 2rem;

  h5 {
    margin-bottom: 1rem;
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
