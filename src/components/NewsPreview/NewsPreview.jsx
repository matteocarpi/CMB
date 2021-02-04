import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled, { css } from 'styled-components'
import SwiperCore, { Navigation, Controller } from 'swiper'
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

  .swiper-container {
    margin: 2rem 0;
  }

  .swiper-button-next,
  .swiper-button-prev {
    &:after {
      margin-bottom: 5rem;
    }
  }
  @media (min-width: 768px) {
    .swiper-button-next,
    .swiper-button-prev {
      &:after {
        margin-bottom: 8rem;
      }
    }
  }
`

const NewsBottom = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 1rem;
`
const cutWidthSmall = Math.sqrt(25 ** 2 * 2)
const cutWidthBig = Math.sqrt(50 ** 2 * 2)

const NewsTitle = styled.span`
  font-size: 16px;
  max-width: calc(100% - ${cutWidthSmall}px);
  padding-left: 1rem;
  @media (min-width: 768px) {
    padding-left: 0;
    max-width: calc(100% - ${cutWidthBig}px);
  }
`

const Plus = styled(PlusIcon)`
  width: 30px;
  margin: 1rem;
  path {
    fill: ${({ theme }) => theme.navy};
  }

  &:hover {
    path {
      fill: ${({ theme }) => theme.gold};
    }
  }

  @media (min-width: 768px) {
    margin: 1rem 0 0 0;
  }
`

const News = styled.div`
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 1rem;
    ${({ isActive }) => isActive && css``}
  }
`

const SwiperDesktop = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
  justify-content: space-around;
  width: 100%;
  height: 100%;

  .swiper-button-next {
    &:after {
      margin-right: 2rem;
    }
  }
  .swiper-button-prev {
    &:after {
      margin-left: 2rem;
    }
  }
`

const Image = styled(ImageCut)``

const SwiperMobile = styled(Swiper)`
  width: 100%;
  @media (min-width: 767px) {
    display: none;
  }
`
SwiperCore.use([Navigation, Controller])

export default function NewsPreview() {
  const data = useStaticQuery(graphql`
    {
      posts: allWpPost(limit: 10, sort: { fields: date, order: DESC }) {
        edges {
          node {
            id
            title
            slug
            featuredImage {
              node {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 900) {
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
        fluid: { originalName: { eq: "placeholder-image.png" } }
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
      <SectionTitle small sub>
        News
      </SectionTitle>

      <SwiperMobile navigation slidesPerView={1}>
        {posts.map(post => {
          const fluid =
            post.node.featuredImage?.node.localFile.childImageSharp.fluid ??
            data.placeholderImage.fluid

          return (
            <SwiperSlide style={{ width: '100%' }} key={post.node.id}>
              {({ isActive }) => (
                <News isActive={isActive}>
                  <Image
                    dr
                    fluid={{
                      ...fluid,
                      aspectRatio: 16 / 9,
                    }}
                  />

                  <NewsBottom>
                    <NewsTitle>{post.node.title}</NewsTitle>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link to={post.node.slug}>
                      <Plus />
                    </Link>
                  </NewsBottom>
                </News>
              )}
            </SwiperSlide>
          )
        })}
      </SwiperMobile>

      <SwiperDesktop>
        {/* Secondary */}
        <Swiper navigation slidesPerView={5}>
          {posts.map(post => {
            const fluid =
              post.node.featuredImage?.node.localFile.childImageSharp.fluid ??
              data.placeholderImage.fluid

            return (
              <>
                <SwiperSlide style={{ width: '100%' }} key={post.node.id}>
                  {({ isActive }) => (
                    <News isActive={isActive}>
                      <Image
                        dr
                        fluid={{
                          ...fluid,
                          aspectRatio: 1,
                        }}
                      />

                      <NewsBottom>
                        <NewsTitle>{post.node.title}</NewsTitle>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link to={post.node.slug}>
                          <Plus />
                        </Link>
                      </NewsBottom>
                    </News>
                  )}
                </SwiperSlide>
              </>
            )
          })}
        </Swiper>
      </SwiperDesktop>
    </Container>
  )
}
