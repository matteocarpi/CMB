import React, { useState } from 'react'
import styled from 'styled-components'
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
  max-height: 100px;
  margin-top: 1rem;
  width: 70%;
  picture {
    img {
      object-fit: contain !important;
    }
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
    }
  }
`

const ThumbButton = styled.button`
  width: 300px;
  height: 100px;
`
export default function ClientiPrincipali({ clientiprincipali, location }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const clientiList = clientiprincipali.map(client => makeSlug(client.cliente))

  const isBrowser = typeof window !== 'undefined'
  const queryObj = isBrowser && queryString.parse(location.search)
  const initialSlide = clientiList.indexOf(queryObj?.client) ?? 0

  return (
    <>
      <SwiperContainer>
        <Swiper
          initialSlide={initialSlide}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChangeTransitionEnd={swiper =>
            navigate(`?client=${clientiList[swiper.activeIndex]}`, {
              state: {
                disableScrollUpdate: true,
              },
            })
          }
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
          {clientiprincipali.map(client => (
            <SwiperSlide key={client.cliente}>
              <ThumbButton
                type="button"
                onClick={() => {
                  navigate(`?client=${makeSlug(client.cliente)}`, {
                    state: {
                      disableScrollUpdate: true,
                    },
                  })
                }}
              >
                <Logo fluid={client.logo.localFile.childImageSharp.fluid} />
              </ThumbButton>
            </SwiperSlide>
          ))}
        </Swiper>
      </ThumbsContainer>
    </>
  )
}
