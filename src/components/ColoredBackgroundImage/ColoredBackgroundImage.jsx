import React from 'react'
import styled, { css } from 'styled-components'
import BackgroundImage from 'gatsby-background-image'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const ColorOverlay = styled.div`
  background-color: ${({ color }) => color ?? 'blue'};
  opacity: ${({ opacity, onlyHover }) => (onlyHover ? 0 : opacity ?? 0.5)};
  width: 100%;
  height: 100%;
  position: absolute;

  &:hover {
    ${({ onlyHover }) =>
      onlyHover &&
      css`
        opacity: ${({ opacity }) => opacity ?? 0.5};
      `}
  }
`

const Img = styled(BackgroundImage)`
  position: relative;
  ${({ backgroundPosition }) =>
    backgroundPosition &&
    css`
      ${'' /* eslint-disable-next-line no-shadow */}
      background-position: ${({ backgroundPosition }) => backgroundPosition};
    `}
`

export default function ColoredBackgroundImage(props) {
  const { children, onlyHover, color, opacity } = props
  return (
    <Img {...props}>
      <Container>
        {children}
        <ColorOverlay color={color} onlyHover={onlyHover} opacity={opacity} />
      </Container>
    </Img>
  )
}
