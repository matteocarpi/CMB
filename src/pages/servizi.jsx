import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import PrimaryService from '../components/PrimaryService'

const Container = styled.section``

const Introduction = styled.article`
  p {
    margin-left: 16px;
  }
  margin-bottom: 30px;
`

const PrimaryServiceList = styled.section``

export default function Servizi() {
  const page = useStaticQuery(graphql`
    {
      data: wpPage(id: { eq: "cG9zdDoxOTgwMg==" }) {
        title
        serviziContent {
          descrizione
          sottotitolo
          consulenza {
            titolo
            descrizione
            immagine {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 700) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
          formazione {
            titolo
            descrizione
            immagine {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 700) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
          vigilanza {
            titolo
            descrizione
            immagine {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 700) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
      vigilanza: allWpServizio(
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

  const data = page.data.serviziContent

  const { consulenza } = page.data.serviziContent
  const { formazione } = page.data.serviziContent
  const { vigilanza } = page.data.serviziContent

  const vigilanzaUri = page.vigilanza.edges[0].node.slug

  const primaryServices = [consulenza, formazione, vigilanza]

  return (
    <Layout>
      <Seo title={page.data.title} />
      <Container>
        <SectionTitle main>{data.sottotitolo}</SectionTitle>

        <Introduction dangerouslySetInnerHTML={{ __html: data.descrizione }} />

        <PrimaryServiceList>
          {primaryServices.map((service, index) => (
            <PrimaryService
              key={service.titolo}
              title={service.titolo}
              description={service.descrizione}
              image={service.immagine.localFile.childImageSharp.fluid}
              index={index}
              servicesNumber={primaryServices.length}
              uri={
                service.titolo.toLowerCase() === 'vigilanza'
                  ? `${service.titolo.toLowerCase()}/${vigilanzaUri}`
                  : service.titolo.toLowerCase()
              }
            />
          ))}
        </PrimaryServiceList>
      </Container>
    </Layout>
  )
}
