import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Thumbs } from 'swiper'
import queryString from 'query-string'
import { navigate } from 'gatsby'

import { makeSlug } from '../../utils'
import Img from '../ImageCut'

SwiperCore.use([Thumbs])

const SwiperContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: white;
`

const Client = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Image = styled(Img)`
  width: 25%;
  min-height: 200px;
  height: 70vh;
  max-height: 900px;
  @media (min-width: 768px) {
    width: 45%;
    min-height: 660px;
  }
`

const Logo = styled(Img)`
  max-height: 98px;
  min-width: 100px;
  margin-top: 1rem;
  width: 70%;
  picture {
    img {
      object-fit: contain !important;
    }
  }

  ${({ active }) =>
    active &&
    css`
      margin-bottom: -2px;
    `}
  &:hover {
    margin-bottom: -2px;
  }
`
const TextContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Text = styled.div`
  margin: 1.7rem 1rem;
  flex-grow: 1;
  max-width: 500px;
`

const Testimonial = styled.h3`
  margin-top: 2rem;
  @media (min-width: 768px) {
    font-size: 47px;
  }
`

const SwiperHeader = styled.div`
  display: flex;
  flex-direction: column;
`

const Voice = styled.p`
  margin: 0;
`

const VoiceInfo = styled.p`
  margin: 0;
  font-weight: bold;
`

const ThumbsContainer = styled.section`
  width: 100%;
  margin-bottom: 1rem;
  .swiper-container {
    .swiper-wrapper {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .swiper-slide {
        width: 50% !important;
        display: flex;
        justify-content: center;
      }
    }
  }
`

const ThumbButton = styled.button`
  width: 50%;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ active }) =>
    active &&
    css`
      border-bottom: solid 2px ${({ theme }) => theme.gold};
    `}
  &:hover {
    border-bottom: solid 2px ${({ theme }) => theme.gold};
    padding-bottom: -2px;
  }
`

const Descrizione = styled.article``

export default function ClientiPrincipali({ clientiprincipali, location }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const clientiList = clientiprincipali.map(client => makeSlug(client.cliente))

  const isBrowser = typeof window !== 'undefined'
  const queryObj = isBrowser && queryString.parse(location.search)
  const initialSlide =
    clientiList.indexOf(queryObj?.client) >= 0
      ? clientiList.indexOf(queryObj?.client)
      : 0

  const [activeSlide, setActiveSlide] = useState(initialSlide)

  return (
    <>
      <SwiperContainer>
        <Swiper
          initialSlide={initialSlide}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChangeTransitionEnd={swiper => {
            navigate(`?client=${clientiList[swiper.activeIndex]}`, {
              state: {
                disableScrollUpdate: true,
              },
            })
            setActiveSlide(swiper.activeIndex)
          }}
        >
          {clientiprincipali.map(client => (
            <SwiperSlide key={client.cliente}>
              <Client>
                <Image
                  fluid={client.immagine?.localFile.childImageSharp.fluid}
                  dr
                />
                <TextContainer>
                  <Text>
                    <SwiperHeader>
                      <Voice>Cliente:</Voice>
                      <VoiceInfo>{client.cliente}</VoiceInfo>
                      <Voice>Commissione</Voice>
                      <VoiceInfo>{client.commissione}</VoiceInfo>
                    </SwiperHeader>
                    <Testimonial>{`"${client.citazione}"`}</Testimonial>
                    <Logo
                      objectFit="contain"
                      fluid={client.logo.localFile.childImageSharp.fluid}
                    />
                  </Text>
                </TextContainer>
              </Client>
              <Descrizione
                dangerouslySetInnerHTML={{ __html: client.descrizione }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>

      <ThumbsContainer>
        <Swiper
          onSwiper={setThumbsSwiper}
          watchSlidesVisibility
          watchSlidesProgress
          slidesPerView={clientiprincipali.length}
          className="thumbs"
        >
          {clientiprincipali.map((client, index) => (
            <SwiperSlide key={client.cliente}>
              <ThumbButton
                active={activeSlide === index}
                type="button"
                onClick={() => {
                  setActiveSlide(index)
                  navigate(`?client=${makeSlug(client.cliente)}`, {
                    state: {
                      disableScrollUpdate: true,
                    },
                  })
                }}
              >
                <Logo
                  active={activeSlide === index}
                  fluid={client.logo.localFile.childImageSharp.fluid}
                />
              </ThumbButton>
            </SwiperSlide>
          ))}
        </Swiper>
      </ThumbsContainer>
    </>
  )
}
