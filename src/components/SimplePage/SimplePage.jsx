import React from 'react'
import styled from 'styled-components'

import SectionTitle from '../SectionTitle'

const Container = styled.main``

const Content = styled.section`
  margin: 2rem 0;

  h3 {
    font-size: 30px;
  }

  h2,
  h3,
  h4,
  li {
    margin: 2rem;
  }

  ul {
    margin: 2rem;
  }
`

export default function SimplePage({ title, content }) {
  return (
    <Container>
      <SectionTitle main>{title}</SectionTitle>
      <Content dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  )
}
