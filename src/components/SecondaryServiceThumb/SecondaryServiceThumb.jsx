import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import ImageCut from '../ImageCut'

const Img = styled(ImageCut)``

const cutWidthSmall = Math.sqrt(25 ** 2 * 2)
const cutWidthBig = Math.sqrt(50 ** 2 * 2)

const Title = styled.h6`
  width: 100%;
  text-align: right;
  margin-top: 0.5rem;
  border-bottom: solid 1px ${({ theme }) => theme.black};
  padding-bottom: 0.4rem;
  text-transform: capitalize;
  max-width: calc(100% - ${cutWidthSmall}px);
  @media (min-width: 768px) {
    max-width: calc(100% - ${cutWidthBig}px);
    border-width: 2px;
  }
`

const WrapperLink = styled(Link)`
  width: 45%;
  max-width: 500px;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    width: 20%;
  }
`

export default function SecondaryServiceThumb({ image, title, uri }) {
  return (
    <WrapperLink to={uri} replace>
      <Img fluid={{ ...image, aspectRatio: 1 }} dr />
      <Title>{title}</Title>
    </WrapperLink>
  )
}
