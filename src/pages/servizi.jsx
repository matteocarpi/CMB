import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import PrimaryService from '../components/PrimaryService'

const Container = styled.section`
  margin-top: 100px;
  padding-top: 30px;
`

const Introduction = styled.article``

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
    }
  `)

  const data = page.data.serviziContent

  const { consulenza } = page.data.serviziContent
  const { formazione } = page.data.serviziContent
  const { vigilanza } = page.data.serviziContent

  const primaryServices = [consulenza, formazione, vigilanza]

  return (
    <Layout>
      <Seo title={page.data.title} />
      <Container>
        <SectionTitle>{data.sottotitolo}</SectionTitle>

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
              uri={service.titolo.toLowerCase()}
            />
          ))}
        </PrimaryServiceList>
      </Container>
    </Layout>
  )
}
