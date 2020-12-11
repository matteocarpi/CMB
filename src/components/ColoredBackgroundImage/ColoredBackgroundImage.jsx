import React from 'react'
import styled, { css } from 'styled-components'
import Img from 'gatsby-background-image'

const ColorOverlay = styled.div`
  background-color: ${({ color }) => color ?? 'blue'};
  opacity: ${({ opacity, onlyHover }) => (onlyHover ? 0 : opacity ?? 0.5)};
  width: 100%;
  height: 100%;
  position: absolute;

  &:hover {
    ${props =>
      props.onlyHover &&
      css`
        opacity: ${({ opacity }) => opacity ?? 0.5};
      `}
  }
`

export default function ColoredBackgroundImage(props) {
  const { children, onlyHover, color, opacity } = props
  return (
    <Img {...props}>
      <ColorOverlay color={color} onlyHover={onlyHover} opacity={opacity} />
      {children}
    </Img>
  )
}
