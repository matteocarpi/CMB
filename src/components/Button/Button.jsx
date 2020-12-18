import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`
export default function Button(props) {
  const { onClick, children } = props

  return (
    <StyledButton {...props} onClick={onClick} type="button">
      {children}
    </StyledButton>
  )
}
