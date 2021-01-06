import React, { useState } from 'react'
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
`
const cutWidth = Math.sqrt(50 ** 2 * 2)

const NewsTitle = styled.span`
  font-size: 20px;
  padding: 1rem 0.5rem;
  max-width: calc(100% - ${cutWidth}px);
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

  .swiper-container:first-child {
    width: 40%;
  }

  .swiper-container:nth-child(2) {
    width: 60%;
  }
  .swiper-button-next {
    &:after {
      margin-right: 2rem;
      margin-bottom: 12rem;
    }
  }
  .swiper-button-prev {
    &:after {
      margin-left: 2rem;
      margin-bottom: 12rem;
    }
  }

  div:first-child {
    .swiper-button-next {
      display: none;
    }
  }

  div:nth-child(2) {
    .swiper-button-prev {
      display: none;
    }
  }
  .swiper-container {
    width: 50%;
  }
`

const Image = styled(ImageCut)`
  @media (min-width: 768px) {
    height: 450px;
  }
`

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
        fluid: { originalName: { eq: "logo-full.png" } }
      ) {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  `)

  const posts = data.posts.edges

  const [controlledSwiper, setControlledSwiper] = useState(null)
  const [secondControlledSwiper, setSecondControlledSwiper] = useState(null)

  return (
    <Container>
      <SectionTitle>News</SectionTitle>

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
                    <Link to="#">
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
        {/* Primary */}
        <Swiper
          navigation
          slidesPerView={1}
          onSwiper={setControlledSwiper}
          controller={{ control: secondControlledSwiper }}
        >
          {posts.map((post, index) => {
            const fluid =
              post.node.featuredImage?.node.localFile.childImageSharp.fluid ??
              data.placeholderImage.fluid

            return (
              index + 3 < posts.length && (
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
                        <Link to="#">
                          <Plus />
                        </Link>
                      </NewsBottom>
                    </News>
                  )}
                </SwiperSlide>
              )
            )
          })}
        </Swiper>

        {/* Secondary */}
        <Swiper
          navigation
          slidesPerView={3}
          // style={{ width: '100%', margin: '2rem 0' }}
          controller={{ control: controlledSwiper }}
          onSwiper={setSecondControlledSwiper}
        >
          {posts.map((post, index) => {
            const fluid =
              post.node.featuredImage?.node.localFile.childImageSharp.fluid ??
              data.placeholderImage.fluid

            return (
              <>
                {index !== 0 && (
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
                          <Link to="#">
                            <Plus />
                          </Link>
                        </NewsBottom>
                      </News>
                    )}
                  </SwiperSlide>
                )}
              </>
            )
          })}
        </Swiper>
      </SwiperDesktop>
    </Container>
  )
}
