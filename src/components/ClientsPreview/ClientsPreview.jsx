import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Img from '../ImageCut'

const Container = styled.div`
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
const Testimonial = styled.h3``

SwiperCore.use([Navigation])

export default function ClientsPreview() {
  const data = useStaticQuery(graphql`
    {
      wpPage(id: { eq: "cG9zdDoxOTc3OQ==" }) {
        clientiContent {
          clienti {
            immagine {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1024) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            nome
            societa
            testimonial
          }
        }
      }
    }
  `)

  const { clienti } = data.wpPage.clientiContent
  return (
    <Container>
      <Swiper navigation>
        {clienti.map(client => (
          <SwiperSlide key={client.nome}>
            <Client>
              <Image
                fluid={client.immagine.localFile.childImageSharp.fluid}
                dr
              />
              <TextContainer>
                <Text>
                  <Testimonial>{`"${client.testimonial}"`}</Testimonial>
                  <span>
                    {client.nome}
                    <br />
                    {client.societa}
                  </span>
                </Text>
              </TextContainer>
            </Client>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}
