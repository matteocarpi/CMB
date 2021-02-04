import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Lg from '../../assets/logo/logo-lines.svg'

const Container = styled(Link)`
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  justify-content: space-between;
  margin: 1rem;
  align-items: center;
  max-width: 300px;
`

const Title = styled.h5`
  font-size: 14px;
  min-width: 200px;
  font-weight: 300;
  text-transform: capitalize;
`

const Logo = styled(Lg)`
  min-width: 35px;
  max-width: 35px;
  height: min-content;
  margin-left: 2rem;
`

const SecondaryServiceTag = ({ title, uri }) => (
  <Container to={uri}>
    <Title>{title}</Title>
    <Logo />
  </Container>
)

export default SecondaryServiceTag
