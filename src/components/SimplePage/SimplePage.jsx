import React from 'react'
import styled from 'styled-components'

import SectionTitle from '../SectionTitle'

const Container = styled.main``

const Content = styled.section``

export default function SimplePage({ title, content }) {
  return (
    <Container>
      <SectionTitle>{title}</SectionTitle>
      <Content>{content}</Content>
    </Container>
  )
}
