import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import ArrowRight from '../../assets/icons/arrow-right.svg'

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

const Text = styled.div`
  width: 70%;
  margin: 1.7rem 1rem;
`
const Testimonial = styled.h3``

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
      <Swiper>
        {clienti.map(client => (
          <SwiperSlide>
            <Client key={client.nome}>
              <Img
                style={{ width: '25%', minHeight: `200px` }}
                fluid={client.immagine.localFile.childImageSharp.fluid}
                dr
              />
              <Text>
                <Testimonial>{`"${client.testimonial}"`}</Testimonial>
                <span>
                  {client.nome}
                  <br />
                  {client.societa}
                </span>
              </Text>
            </Client>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}
