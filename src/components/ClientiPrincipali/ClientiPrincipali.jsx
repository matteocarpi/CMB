import React, { useState } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Thumbs } from 'swiper'

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

export default function ClientiPrincipali({ clientiprincipali }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const [activeSlide, setActiveSlide] = useState()

  return (
    <>
      <SwiperContainer>
        <Swiper
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          activeSlideKey={key}
        >
          {clientiprincipali.map(client => (
            <SwiperSlide key={client.nome}>
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

      <Swiper
        onSwiper={setThumbsSwiper}
        watchSlidesVisibility
        watchSlidesProgress
      >
        {clientiprincipali.map(client => (
          <SwiperSlide>
            <Logo fluid={client.logo.localFile.childImageSharp.fluid} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
