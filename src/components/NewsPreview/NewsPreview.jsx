import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import SectionTitle from '../SectionTitle'
import PlusIcon from '../../assets/icons/plus.svg'

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

const Image = styled(Img)`
  width: 100%;
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

  const posts = data.posts.edges

  const latestPost = data.posts.edges[0].node

  return (
    <Container>
      <SectionTitle>News</SectionTitle>

      <SingleNews>
        <News>
          <Image
            fluid={
              latestPost.featuredImage?.node.localFile.childImageSharp.fluid ??
              data.placeholderImage.fluid
            }
          />

          <NewsBottom>
            <NewsTitle>{latestPost.title}</NewsTitle>
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
            <News>
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
