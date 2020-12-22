import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import ImageCut from '../ImageCut'

const Img = styled(ImageCut)``

const Title = styled.h5`
  width: 90%;
  text-align: right;
  margin-top: 0.5rem;
  border-bottom: solid 1px ${({ theme }) => theme.black};
`

const WrapperLink = styled(Link)`
  width: 45%;
  margin-bottom: 2rem;
`

export default function SecondaryServiceThumb({ image, title, uri }) {
  return (
    <WrapperLink to={uri}>
      <Img fluid={{ ...image, aspectRatio: 1 }} dr />
      <Title>{title}</Title>
    </WrapperLink>
  )
}
