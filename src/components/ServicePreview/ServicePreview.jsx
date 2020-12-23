import React, { useState, useLayoutEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { motion, useViewportScroll, useTransform } from 'framer-motion'

import SectionTitle from '../SectionTitle'
import IconPlus from '../../assets/icons/plus.svg'
import Image from '../ImageCut'

const Container = styled.div`
  margin: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    margin: 10rem 0;
  }
`
const ButtonWrap = styled.div`
  position: relative;
  ${({ active }) =>
    active &&
    css`
      &:before {
        content: '';
        height: 20px;
        width: 30px;
        border-left: solid 2px ${({ theme }) => theme.gold};
        position: absolute;
        left: -8px;
        top: 8px;
      }
    `}

  &:hover {
    &:before {
      content: '';
      height: 20px;
      width: 30px;
      border-left: solid 2px ${({ theme }) => theme.gold};
      position: absolute;
      left: -8px;
      top: 8px;
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
  font-size: 18px;
  font-weight: 200;
  transform-origin: center left;
  transition-duration: 0.5s;
`

const Menu = styled.div`
  margin: 1rem 0;
  padding-left: 1rem;
  align-self: flex-start;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`
const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
`

const Preview = styled(motion.div)`
  background-color: ${({ theme }) => theme.navy};
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 2rem 1rem;
  position: relative;
  /* &:after {
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
  } */
`

const Content = styled.div`
  color: white;
  border-left: solid 1px ${({ theme }) => theme.gold};
  max-width: 700px;
  p {
    margin: 0.5rem;
    padding-left: 1rem;
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
  &:hover {
    path {
      fill: ${({ theme }) => theme.gold};
    }
  }
  align-self: flex-end;
  margin-top: 3rem;
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
`

const Img = styled(Image)`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
  width: 20%;
  height: 150%;
  align-self: center;
`

export default function ServicePreview() {
  const [currentService, setCurrentService] = useState(null)

  const ref = useRef()

  const [scrollPercentageStart, setScrollPercentageStart] = useState()
  const [scrollPercentageEnd, setScrollPercentageEnd] = useState()

  const { scrollYProgress } = useViewportScroll()

  useLayoutEffect(() => {
    // Get the distance from the start of the page to the element start
    const rect = ref?.current?.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const offsetTop = rect.top + scrollTop

    const offsetStart = rect.top + scrollTop
    const offsetEnd = offsetTop + rect.height

    const elementScrollStart = offsetStart / document.body.clientHeight
    const elementScrollEnd = offsetEnd / document.body.clientHeight

    setScrollPercentageStart(elementScrollStart)
    setScrollPercentageEnd(elementScrollEnd)
  }, [])

  const heightPercentage = scrollPercentageEnd - scrollPercentageStart
  const middlePercentage = heightPercentage / 2
  const translatePreview = useTransform(
    scrollYProgress,
    [
      scrollPercentageStart - heightPercentage * 2,
      scrollPercentageStart + middlePercentage / 2,
    ],
    [1000, 0],
  )
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
          consulenza {
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
            titolo
          }
          formazione {
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
            titolo
          }
          vigilanza {
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
            titolo
          }
        }
      }
    }
  `)

  const { serviziContent } = data.wpPage
  const { consulenza } = serviziContent
  const { formazione } = serviziContent
  const { vigilanza } = serviziContent

  const servizi = [consulenza, formazione, vigilanza]

  const description =
    servizi[currentService]?.descrizione ?? serviziContent.descrizione

  const uri = servizi[currentService]?.titolo.toLowerCase() ?? ''

  const image =
    servizi[currentService]?.immagine.localFile.childImageSharp.fluid ??
    serviziContent.immagine.localFile.childImageSharp.fluid

  return (
    <Container>
      <Row>
        <Left>
          <SectionTitle onClick={() => setCurrentService(null)}>
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
          <Preview ref={ref} style={{ x: translatePreview }}>
            <PreviewContainer>
              <Content
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <StyledLink to={`servizi/${uri}`}>
                <Plus />
              </StyledLink>
            </PreviewContainer>
          </Preview>
          <Img dl fluid={image} />
        </Right>
      </Row>
    </Container>
  )
}
