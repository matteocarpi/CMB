import React, { useState, useRef, useLayoutEffect } from 'react'
import styled, { css } from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Thumbs } from 'swiper'
import queryString from 'query-string'
import { useStaticQuery, graphql, navigate } from 'gatsby'

import { motion, useAnimation } from 'framer-motion'

import useViewportScroll from '../../hooks/useViewportScroll'
import useViewportHeight from '../../hooks/useViewportHeight'

import useViewportWidth from '../../hooks/useViewportWidth'
import { makeSlug } from '../../utils'
import Img from '../ImageCut'
import Video from '../Video'
import SectionTitle from '../SectionTitle'

SwiperCore.use([Thumbs])

const SwiperWrapper = styled(motion.div)`
  ${({ home }) =>
    home &&
    css`
      width: 100%;
      transform: translateY(300);
      opacity: 0;
      @media (min-width: 768px) {
        padding-top: 10rem;
      }
    `}
`

const SwiperContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => theme.navy};
  margin-top: 2rem;
  margin-bottom: 10rem;
  margin-right: auto;
  * {
    color: white;
  }

  @media (min-width: 940px) {
    .swiper-button-next {
      color: ${({ theme }) => theme.navy};
    }
  }
`

const Client = styled.div`
  width: 100%;
  height: 100%;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin-right: 2rem;
  }
`

const Image = styled(Img)`
  width: 20%;
  min-width: 75px;
  min-height: 420px;
  max-height: 560px;
  @media (min-width: 768px) {
    width: 45%;
    min-height: 700px;
  }
  @media (max-width: 767px) {
    float: left;
    margin: 0 2rem 0 0;
  }
`
const StyledVideo = styled(Video)`
  width: 20%;
  min-width: 75px;
  min-height: 420px;
  max-height: 560px;
  @media (min-width: 768px) {
    width: 45%;
    min-height: 700px;
  }
  @media (max-width: 767px) {
    float: left;
    margin: 0 2rem 0 0;
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
  position: relative;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 940px) {
    &:before {
      content: '';
      z-index: 1;
      width: 50px;
      height: 50px;
      background-color: white;
      ${({ blue }) =>
        blue &&
        css`
          background-color: ${({ theme }) => theme.navy};
        `}

      position: absolute;
      bottom: 0;
      right: 0;
      transform: scale(2) rotate(45deg) translate(-17.5px, 35.5px);
    }
  }

  @media (min-width: 940px) {
    padding-right: 1rem;
    &:after {
      position: absolute;
      content: '';
      width: 100px;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: white;
    }
  }
`

const Text = styled.div`
  margin: 1.7rem 1rem;
  margin-bottom: 0;
  flex-grow: 1;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 5rem 0 2.5rem;
  @media (max-width: 767px) {
    padding: 0 1rem;
    margin-top: 0;
    margin: 0;
    padding: 0;
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

  @media (min-width: 768px) {
    margin: 7rem 0 2rem 0;
    .swiper-container {
      .swiper-wrapper {
        .swiper-slide {
          width: 20% !important;
          height: 100%;
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

const CommissionDescription = styled.article`
  margin: 1rem;
  p {
    margin-left: 0;
  }
  z-index: 5;

  @media (min-width: 768px) {
    margin: 0;
  }
`

const Bit = styled.div`
  margin: 1rem 0;
`

const Person = styled.p`
  margin: 2rem;
  margin-right: 2rem;
  align-self: flex-end;
  text-align: right;
`

const wrapperVariants = {
  hidden: {
    translateY: 300,
    opacity: 0,
  },
  visible: {
    translateY: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
}

export default function ClientiPrincipali({ location, home }) {
  const ref = useRef()

  const [elementStart, setElementStart] = useState()

  const viewportHeight = useViewportHeight()
  const scrollY = useViewportScroll()

  useLayoutEffect(() => {
    const rect = ref?.current?.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    const offsetStart = rect.top + scrollTop

    setElementStart(offsetStart)
  }, [])

  const inView = elementStart - viewportHeight <= scrollY

  const controls = useAnimation()

  useLayoutEffect(() => {
    if (home) {
      if (inView) {
        // controls.start('hidden').then(() =>
        controls.start('visible')
        // )
      } else {
        controls.start('exit').then(() => controls.start('hidden'))
      }
    }
  }, [controls, inView, home])

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

  const isMobile = useViewportWidth() < 768

  return (
    <SwiperWrapper
      home={home}
      ref={ref}
      variants={wrapperVariants}
      animate={controls}
      exit={controls}
    >
      {home && (
        <SectionTitle sub uri="/clienti">
          Clienti
        </SectionTitle>
      )}
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
                    blue
                  />
                ) : (
                  <StyledVideo
                    mp4={client.video.mp4.mediaItemUrl}
                    webm={client.video.webm.mediaItemUrl}
                    dr
                    blue
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
                      <>
                        <CommissionDescription
                          dangerouslySetInnerHTML={{
                            __html: client.descrizione,
                          }}
                        />
                        <Person>{client.persona}</Person>
                      </>
                    )}
                  </Text>
                </TextContainer>
                {isMobile && !home && (
                  <CommissionDescription
                    dangerouslySetInnerHTML={{
                      __html: client.descrizione,
                    }}
                  />
                )}
                {isMobile && !home && <Person>{client.persona}</Person>}
              </Client>
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
    </SwiperWrapper>
  )
}
