import React from 'react'
import Img from 'gatsby-image'
import styled, { css } from 'styled-components'

const Image = styled(Img)`
  position: relative;
  ${({ dr }) =>
    dr &&
    css`
      &:before {
        content: '';
        z-index: 1;
        width: 50px;
        height: 50px;
        background-color: white;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: rotate(45deg) translate(35px, 0px);
      }
      @media (min-width: 768px) {
        &:before {
          content: '';
          z-index: 1;
          width: 50px;
          height: 50px;
          background-color: white;
          position: absolute;
          bottom: 0;
          left: 0;
          transform: scale(2) rotate(-45deg) translate(-17.5px, 0px);
        }
      }
    `}
  ${({ dl }) =>
    dl &&
    css`
      &:before {
        content: '';
        z-index: 1;
        width: 50px;
        height: 50px;
        background-color: white;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: rotate(-45deg) translate(-35px, 0px);
      }
      @media (min-width: 768px) {
        &:before {
          content: '';
          z-index: 1;
          width: 50px;
          height: 50px;
          background-color: white;
          position: absolute;
          bottom: 0;
          left: 0;
          transform: scale(2) rotate(-45deg) translate(-17.5px, 0px);
        }
      }
    `}
  ${({ dr }) =>
    dr &&
    css`
      &:before {
        content: '';
        z-index: 1;
        width: 50px;
        height: 50px;
        background-color: white;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: rotate(45deg) translate(35px, 0px);
      }
    `}
  ${({ dr }) =>
    dr &&
    css`
      &:before {
        content: '';
        z-index: 1;
        width: 50px;
        height: 50px;
        background-color: white;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: rotate(45deg) translate(35px, 0px);
      }
    `}
`

export default function ImageCut(props) {
  return <Image {...props} />
}
