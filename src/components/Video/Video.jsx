import React from 'react'
import styled, { css } from 'styled-components'

const VideoContainer = styled.div`
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
          right: 0;
          transform: scale(2) rotate(45deg) translate(17.5px, 0px);
        }
      }
    `}
`

const VideoBox = styled.video`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  object-fit: cover;
`

export default function Video({ mp4, webm, className, dr }) {
  return (
    <VideoContainer className={className} dr={dr}>
      <VideoBox playsInline autoPlay muted loop>
        <source src={mp4} type="video/mp4" />
        <source src={webm} type="video/webm" />
      </VideoBox>
    </VideoContainer>
  )
}