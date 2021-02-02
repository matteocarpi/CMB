import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Thumbs } from 'swiper'
import queryString from 'query-string'
import { useStaticQuery, graphql, navigate } from 'gatsby'

import useViewportWidth from '../../hooks/useViewportWidth'
import { makeSlug } from '../../utils'
import Img from '../ImageCut'
import Video from '../Video'

SwiperCore.use([Thumbs])

const SwiperContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: white;
  margin-top: 2rem;
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
    min-height: 760px;
  }
`
const StyledVideo = styled(Video)`
  width: 25%;
  min-height: 200px;
  height: 70vh;
  max-height: 600px;
  @media (min-width: 768px) {
    width: 45%;
    min-height: 600px;
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

  @media (min-width: 768px) {
    width: min-content;
    min-width: 200px;
    margin-top: 0;
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
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 4rem;
`

// const FirstRow = styled.div`
//   display: flex;
//   align-items: flex-end;
//   margin-bottom: 2rem;
// `

// const Testimonial = styled.h3`
//   margin-top: 2rem;
//   @media (min-width: 768px) {
//     font-size: 47px;
//   }
// `

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

  @media (min-width: 768px) {
    margin: 7rem 0 2rem 0;
    .swiper-container {
      .swiper-wrapper {
        .swiper-slide {
          width: 20% !important;
        }
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

const CommissionDescription = styled.article`
  p {
    margin-left: 0;
  }
`

const Bit = styled.div`
  margin: 1rem 0;
`

const Person = styled.span`
  font-size: 16px;
  font-weight: 400;
  margin-top: 2rem;
  margin-right: 2rem;
  align-self: flex-end;
`

export default function ClientiPrincipali({ location, home }) {
  const data = useStaticQuery(graphql`
    query ClientiPrincipali {
      clientiPage: wpPage(id: { eq: "cG9zdDoxOTc3OQ==" }) {
        title
        clientiContent {
          descrizione
          clientiprincipali {
            cliente
            logo {
              localFile {
                id
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            commissione
            descrizione
            videoOFoto
            video {
              mp4 {
                mediaItemUrl
              }
              webm {
                mediaItemUrl
              }
            }
            immagine {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            citazione
            persona
          }
        }
      }
    }
  `)
  const { clientiprincipali } = data.clientiPage.clientiContent

  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const clientiList = clientiprincipali.map(client => makeSlug(client.cliente))

  const isBrowser = typeof window !== 'undefined'
  const queryObj = isBrowser && queryString?.parse(location?.search)
  const initialSlide =
    clientiList.indexOf(queryObj?.client) >= 0
      ? clientiList.indexOf(queryObj?.client)
      : 0

  const [activeSlide, setActiveSlide] = useState(initialSlide)

  const viewportWidth = useViewportWidth()
  const isMobile = viewportWidth < 768

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
                {client.videoOFoto === 'Foto' ? (
                  <Image
                    fluid={client.immagine?.localFile.childImageSharp.fluid}
                    dr
                  />
                ) : (
                  <StyledVideo
                    mp4={client.video.mp4.mediaItemUrl}
                    webm={client.video.webm.mediaItemUrl}
                    dr
                  />
                )}
                <TextContainer>
                  <Text>
                    <SwiperHeader>
                      <Bit>
                        <Logo
                          objectFit="contain"
                          fluid={client.logo.localFile.childImageSharp.fluid}
                        />
                      </Bit>
                      <Bit>
                        <Voice>Cliente:</Voice>
                        <VoiceInfo>{client.cliente}</VoiceInfo>
                      </Bit>
                      <Bit>
                        <Voice>Commissione:</Voice>
                        <VoiceInfo>{client.commissione}</VoiceInfo>
                      </Bit>
                    </SwiperHeader>
                    {!isMobile && (
                      <CommissionDescription
                        dangerouslySetInnerHTML={{ __html: client.descrizione }}
                      />
                    )}
                    <Person>{client.persona}</Person>
                    {/* <Testimonial>{`"${client.citazione}"`}</Testimonial> */}
                  </Text>
                </TextContainer>
              </Client>
              {isMobile && (
                <Descrizione
                  dangerouslySetInnerHTML={{ __html: client.descrizione }}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
      {!home && (
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
      )}
    </>
  )
}
