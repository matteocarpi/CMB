import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import ImageCut from '../ImageCut'
import PlusIcon from '../../assets/icons/plus.svg'

const Container = styled(Link)`
  flex-basis: 0;
  flex-grow: 1;
  margin: 30px;

  &:hover {
    ${Plus} {
      path {
        fill: ${({ theme }) => theme.gold};
      }
    }
  }
`

const Image = styled(ImageCut)``

const cutWidthSmall = Math.sqrt(25 ** 2 * 2)
const cutWidthBig = Math.sqrt(50 ** 2 * 2)

const Title = styled.span`
  font-size: 20px;
  max-width: calc(100% - ${cutWidthSmall}px);

  @media (min-width: 768px) {
    max-width: calc(100% - ${cutWidthBig}px);
  }
`

const Plus = styled(PlusIcon)`
  path {
    fill: ${({ theme }) => theme.black};
  }
  width: 30px;
`

const Footer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`

export default function PostThumb({ className, image, uri, title }) {
  return (
    <Container className={className} to={`/${uri}`}>
      <Image dr fluid={{ ...image, aspectRatio: 1 }} />
      <Footer>
        <Title>{title}</Title>
        <Plus />
      </Footer>
    </Container>
  )
}
