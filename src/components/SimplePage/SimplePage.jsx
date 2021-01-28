import React from 'react'
import styled from 'styled-components'

import SectionTitle from '../SectionTitle'

const Container = styled.main``

const Content = styled.section`
  margin: 2rem 0;
`

export default function SimplePage({ title, content }) {
  return (
    <Container>
      <SectionTitle>{title}</SectionTitle>
      <Content dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  )
}
