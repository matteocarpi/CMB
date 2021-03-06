import React, { useRef, useState, useLayoutEffect } from 'react'
import styled, { css } from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { motion, useAnimation } from 'framer-motion'

import useViewportScroll from '../../hooks/useViewportScroll'
import useViewportHeight from '../../hooks/useViewportHeight'

import Image from '../ImageCut'
import SectionTitle from '../SectionTitle'
import IconPlus from '../../assets/icons/plus.svg'

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`

const Container = styled(motion.div)`
  transform: translateY(300);
  margin-top: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4rem;
`
const ButtonWrap = styled.div`
  position: relative;
  ${({ active }) =>
    active &&
    css`
      &:before {
        content: '';
        height: 26px;
        width: 30px;
        border-left: solid 2px ${({ theme }) => theme.gold};
        position: absolute;
        left: -8px;
        top: 10px;
      }
    `}

  &:hover {
    &:before {
      content: '';
      height: 26px;
      width: 30px;
      border-left: solid 2px ${({ theme }) => theme.gold};
      position: absolute;
      left: -8px;
      top: 10px;
    }
  }
`

const Button = styled.button`
  background-color: white;
  cursor: pointer;
  border: none;
  box-shadow: none;
  text-align: left;
  padding: 0.3rem 0;
  font-size: 24px;
  font-weight: 300;
  transform-origin: center left;
  transition-duration: 0.5s;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`

const Menu = styled.div`
  margin: 2.5rem 0;
  padding-left: 1rem;
  align-self: flex-start;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    margin: 1rem 0;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    padding: 0;
  }
`

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  @media (min-width: 768px) {
    height: 500px;
  }
`

const Preview = styled.div`
  background-color: ${({ theme }) => theme.navy};
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 2rem 2rem 2rem 1rem;
  position: relative;
  &:after {
    content: '';
    width: 50px;
    height: 50px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: rotate(45deg) translate(0px, 35px);
  }
  @media (min-width: 768px) {
    &:after {
      content: '';
      width: 50px;
      height: 50px;
      background-color: white;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: scale(2) rotate(45deg) translate(0px, 17.5px);
    }
  }
`

const Content = styled.div`
  color: white;
  border-left: solid 1px ${({ theme }) => theme.gold};
  max-width: 700px;
  width: 100%;
  p {
    margin: 0.5rem;
    padding-left: 1rem;

    &:first-child {
      margin-bottom: 2rem;
    }
  }
  * {
    color: white;
  }
  @media (min-width: 768px) {
    margin: 2rem;
    flex-grow: 1;
  }
`
const StyledLink = styled(Link)`
  width: min-content;
  align-self: flex-end;
`
const Plus = styled(IconPlus)`
  transform: scale(2);
  &:hover {
    path {
      fill: ${({ theme }) => theme.gold};
    }
  }
  align-self: flex-end;
`

const Row = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
    width: 100%;
  }
`

const Left = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 40%;
  }
`

const Right = styled.div`
  width: 100%;
  display: flex;
  @media (min-width: 768px) {
    height: 650px;
  }
`

const Img = styled(Image)`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
  width: 20%;
  height: 100%;
  align-self: center;
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
export default function ServicePreview({ services }) {
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
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('exit').then(() => controls.start('hidden'))
    }
  }, [controls, inView])

  const [currentService, setCurrentService] = useState(0)

  const data = useStaticQuery(graphql`
    {
      wpPage(id: { eq: "cG9zdDoxOTgwMg==" }) {
        title
        serviziContent {
          descrizione
          immagine {
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
      allWpServizio(
        filter: { servizioContent: { categoria: { eq: "vigilanza" } } }
      ) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  const { serviziContent } = data.wpPage
  const { consulenza, formazione, vigilanza } = services

  const servizi = [consulenza, formazione, vigilanza]

  const description =
    servizi[currentService]?.citazione.concat(
      ' ',
      servizi[currentService]?.informazioni,
    ) ?? serviziContent.descrizione

  const uri =
    servizi[currentService]?.titolo.toLowerCase() === 'vigilanza'
      ? `/vigilanza-antincendio`
      : servizi[currentService]?.titolo.toLowerCase() ?? ''

  const servizioUri =
    uri === '/vigilanza-antincendio'
      ? 'vigilanza-antincendio'
      : `servizi/${uri}`

  const image =
    servizi[currentService]?.immagine.localFile.childImageSharp.fluid ??
    serviziContent.immagine.localFile.childImageSharp.fluid

  return (
    <Wrapper ref={ref}>
      <Container
        variants={wrapperVariants}
        initial="hidden"
        animate={controls}
        exit={controls}
      >
        <Row>
          <Left>
            <SectionTitle sub uri="/servizi">
              {data.wpPage.title}
            </SectionTitle>
            <Menu>
              {servizi.map((service, index) => (
                <ButtonWrap
                  key={service.titolo}
                  active={index === currentService}
                >
                  <Button onClick={() => setCurrentService(index)}>
                    {service.titolo}
                  </Button>
                </ButtonWrap>
              ))}
            </Menu>
          </Left>
          <Right>
            <Preview>
              <PreviewContainer>
                {/* Magic. Do not touch. */}
                <Content dangerouslySetInnerHTML={{ __html: description }} />
                <StyledLink to={servizioUri}>
                  <Plus />
                </StyledLink>
              </PreviewContainer>
            </Preview>
            <Img dl blue fluid={image} />
          </Right>
        </Row>
      </Container>
    </Wrapper>
  )
}
