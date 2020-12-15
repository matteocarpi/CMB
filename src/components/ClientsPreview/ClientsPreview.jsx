import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Img from '../ImageCut'

const Container = styled.div`
  margin: 4rem 0;
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

export default function ClientsPreview({ children }) {
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
      {clienti.map(client => (
        <Client>
          <Img
            style={{ width: '25%' }}
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
      ))}
      {children}
    </Container>
  )
}
