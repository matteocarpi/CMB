import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import SectionTitle from '../SectionTitle'
import PlusIcon from '../../assets/icons/plus.svg'
import ImageCut from '../ImageCut'
import 'swiper/swiper.scss'

const Container = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NewsBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const News = styled.div`
  margin: 0 auto;
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

  return (
    <Container>
      <SectionTitle>News</SectionTitle>

      <Swiper style={{ width: '100%', margin: '2rem 0' }}>
        {posts.map(post => {
          const fluid =
            post.node.featuredImage?.node.localFile.childImageSharp.fluid ??
            data.placeholderImage.fluid

          return (
            <SwiperSlide key={post.id}>
              <News>
                <ImageCut
                  dr
                  fluid={{
                    ...fluid,
                    aspectRatio: 16 / 9,
                  }}
                />

                <NewsBottom>
                  <NewsTitle>{post.node.title}</NewsTitle>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link to="#">
                    <Plus />
                  </Link>
                </NewsBottom>
              </News>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}
