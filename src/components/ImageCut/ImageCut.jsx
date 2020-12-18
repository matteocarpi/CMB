import React from 'react'
import Img from 'gatsby-image'
import styled, { css } from 'styled-components'

const Image = styled(Img)`
  position: relative;
  &:before {
    content: '';
    z-index: 1;
    width: 50px;
    height: 50px;
    background-color: white;
    position: absolute;
    ${({ dr }) =>
      dr &&
      css`
        bottom: 0;
        right: 0;
        transform: rotate(45deg) translate(35px, 0px);
      `}
  }
`

export default function ImageCut(props) {
  return <Image {...props} />
}
