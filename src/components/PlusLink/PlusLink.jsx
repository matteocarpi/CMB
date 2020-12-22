import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import PlusIcon from '../../assets/icons/plus.svg'

const Plus = styled(PlusIcon)`
  margin: 1rem;
  path {
    fill: ${({ theme }) => theme.navy};
  }

  ${({ light }) =>
    light &&
    css`
      path {
        fill: white;
      }
    `}

  &:hover {
    path {
      fill: ${({ theme }) => theme.gold};
    }
  }
`

export default function PlusLink({ to, className, light }) {
  return (
    <Link to={to} className={className}>
      <Plus className={className} light={light} />
    </Link>
  )
}
