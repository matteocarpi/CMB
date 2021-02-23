import React, { useState, useRef, useLayoutEffect } from 'react'
import styled, { css } from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Thumbs, Pagination } from 'swiper'
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

SwiperCore.use([Thumbs, Pagination])

const SwiperWrapper = styled(motion.div)`
  position: relative;
  ${({ home }) =>
    home &&
    css`
      width: 100%;
      transform: translateY(300);
      opacity: 0;
      @media (min-width: 768px) {
        padding-top: 5rem;
      }
    `}
`

const SwiperContainer = styled(motion.div)`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 5rem;
  margin-right: auto;
  * {
    color: white;
  }
  overflow: visible;

  .swiper-pagination {
  }

  @media (min-width: 940px) {
    .swiper-button-next {
      color: ${({ theme }) => theme.navy};
    }
    .swiper-button-prev {
      display: none;
    }
  }
`

const Client = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.navy};
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin-right: 2rem;
  }
  padding-bottom: 50px;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 0;
    background-color: white;
  }
`

const ImageWrapper = styled.div`
  width: 20%;
  min-width: 75px;
  min-height: 420px;
  z-index: 1;
  @media (min-width: 768px) {
    width: 45%;
    min-height: 700px;
    height: 100%;
  }
`

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Bottom = styled.div`
  @media (max-width: 767px) {
    margin-left: 2rem;
    padding-bottom: 2rem;
  }
`

const Image = styled(Img)`
  height: 100%;
`
const StyledVideo = styled(Video)`
  height: 100%;
`

const Logo = styled(Img)`
  max-width: 200px;
`

const LogoThumb = styled(Img)`
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
  margin-left: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
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

  @media (max-width: 940px) {
    ${({ home }) =>
      home &&
      css`
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
          transform: rotate(45deg) translate(35px, 0);
        }
      `}
    padding-right: 2rem;
  }
`

const Text = styled.div`
  margin: 0 1rem;
  flex-grow: 1;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 5rem 0 2.5rem;
  @media (max-width: 767px) {
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
        <SectionTitle sub uri="/clienti-e-partner">
          Clienti
        </SectionTitle>
      )}
      <SwiperContainer>
        <Swiper
          loop
          initialSlide={initialSlide}
          navigation={!isMobile}
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChangeTransitionEnd={swiper => {
            if (!home) {
              navigate(`?client=${clientiList[swiper.activeIndex - 1]}`, {
                state: {
                  disableScrollUpdate: true,
                },
              })
              setActiveSlide(swiper.activeIndex)
            }
          }}
        >
          {clientiprincipali.map(client => (
            <SwiperSlide key={client.cliente}>
              <Client>
                <Top>
                  <ImageWrapper>
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
                  </ImageWrapper>
                  <TextContainer home={home}>
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
                        </>
                      )}
                    </Text>
                  </TextContainer>
                </Top>
                {isMobile && !home && (
                  <Bottom>
                    <>
                      <CommissionDescription
                        dangerouslySetInnerHTML={{
                          __html: client.descrizione,
                        }}
                      />
                    </>
                  </Bottom>
                )}
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
                  <LogoThumb
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
