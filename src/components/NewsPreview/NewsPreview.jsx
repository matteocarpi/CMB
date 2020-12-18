import React, { useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import SectionTitle from '../SectionTitle'
import PlusIcon from '../../assets/icons/plus.svg'
import ImageCut from '../ImageCut'
import ArrowLeft from '../../assets/icons/arrow-left.svg'
import ArrowRight from '../../assets/icons/arrow-right.svg'
import Button from '../Button'

const Container = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const News = styled.div`
  width: 100%;
`

const NewsBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const SingleNews = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    display: none;
  }
  margin-top: 2rem;
`

const NewsList = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
  margin-top: 2rem;
`

const ImageWrapper = styled.div`
  position: relative;
`

const NewsTitle = styled.span`
  text-transform: uppercase;
  padding: 1rem 0.5rem;
`

const Plus = styled(PlusIcon)`
  margin: 1rem;
  path {
    fill: ${({ theme }) => theme.navy};
  }

  &:hover {
    path {
      fill: ${({ theme }) => theme.gold};
    }
  }
`

const LeftButton = styled(Button)`
  position: absolute;
  z-index: 2;
  left: 15px;
  top: 40%;
`

const RightButton = styled(Button)`
  position: absolute;
  z-index: 2;
  right: 15px;
  top: 40%;
`

export default function NewsPreview() {
  const data = useStaticQuery(graphql`
    {
      posts: allWpPost(limit: 10, sort: { fields: date, order: DESC }) {
        edges {
          node {
            id
            title
            featuredImage {
              node {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
      placeholderImage: imageSharp(
        fluid: { originalName: { eq: "logo-full.png" } }
      ) {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  `)

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const posts = data.posts.edges

  console.log(posts.length)
  const currentNews = data.posts.edges[currentNewsIndex].node

  const currentFluid =
    currentNews.featuredImage?.node.localFile.childImageSharp.fluid ??
    data.placeholderImage.fluid
  const nextNews = currentNewsIndex >= posts.length - 1 ? 0 : currentNewsIndex + 1
  const prevNews = currentNewsIndex <= 0 ? 0 : currentNewsIndex - 1

  return (
    <Container>
      <SectionTitle>News</SectionTitle>

      <SingleNews>
        <News>
          <ImageWrapper>
            <LeftButton onClick={() => setCurrentNewsIndex(prevNews)}>
              <ArrowLeft />
            </LeftButton>
            <ImageCut
              dr
              fluid={{
                ...currentFluid,
                aspectRatio: 16 / 9,
              }}
            />
            <RightButton onClick={() => setCurrentNewsIndex(nextNews)}>
              <ArrowRight />
            </RightButton>
          </ImageWrapper>

          <NewsBottom>
            <NewsTitle>{currentNews.title}</NewsTitle>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to="#">
              <Plus />
            </Link>
          </NewsBottom>
        </News>
      </SingleNews>

      <NewsList>
        {posts.map(post => {
          const p = post.node

          return (
            <News key={p.id}>
              <Img
                fluid={
                  p?.featuredImage?.node.localFile.childImageSharp.fluid ??
                  data.placeholderImage.fluid
                }
              />
            </News>
          )
        })}
      </NewsList>
    </Container>
  )
}
