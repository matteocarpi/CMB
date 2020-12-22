import React from 'react'
import styled, { css } from 'styled-components'
import ImageCut from '../ImageCut'
import PlusLink from '../PlusLink'

const Container = styled.article`
  width: 100%;
  display: flex;
  align-items: center;
  ${({ reverseRow }) =>
    reverseRow &&
    css`
      flex-direction: row-reverse;
    `}
`

const Image = styled(ImageCut)`
  width: 30%;
  min-height: 450px;

  @media (min-width: 768px) {
    width: 50%;
    min-height: 650px;
  }
`

const Text = styled.section`
  width: 65%;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 50%;
  }
`
const Title = styled.h3``
const Description = styled.article`
  p {
    margin: 1rem 0;
  }
`

const Plus = styled(PlusLink)`
  align-self: flex-end;
  margin: 0;
`

export default function PrimaryService({
  title,
  description,
  image,
  index,
  servicesNumber,
  uri,
}) {
  const isRight = index % 2 !== 0
  const isLeft = !isRight

  const ur = isLeft && index !== 0
  const dr = isLeft && index !== servicesNumber - 1
  const ul = isRight && index !== 0
  const dl = isRight && index !== servicesNumber - 1

  return (
    <Container reverseRow={isRight}>
      <Image dr={dr} dl={dl} ul={ul} ur={ur} fluid={image} />
      <Text>
        <Title>{title}</Title>
        <Description dangerouslySetInnerHTML={{ __html: description }} />
        <Plus to={uri} />
      </Text>
    </Container>
  )
}
