import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Lg from '../../assets/logo/logo-lines.svg'

const Container = styled(Link)`
  display: flex;
  margin: 1rem;
  justify-content: space-between;
  align-items: center;
  max-width: 610px;

  &:hover {
    li {
      border-bottom: solid 1px ${({ theme }) => theme.gold};
      padding-bottom: calc(0.5rem - 1px);
    }
  }

  @media (min-width: 768px) {
    min-width: 610px;
  }
`

const Title = styled.li`
  min-width: 200px;
  font-weight: 300;
  padding-bottom: 0.5rem;
  color: white;
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
    {/* <Logo /> */}
  </Container>
)

export default SecondaryServiceTag
