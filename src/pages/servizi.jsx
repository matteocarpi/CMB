import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import PrimaryService from '../components/PrimaryService'

const Container = styled.section`
  margin-bottom: 30px;
`

const Introduction = styled.article`
  p {
    margin-left: 30px;
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
            citazione
            informazioni
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
            citazione
            informazioni
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
            citazione
            informazioni
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
      <Seo
        title={page.data.title}
        description={data.descrizione}
        uri="/servizi"
      />
      <Container>
        <SectionTitle main uri="/servizi">
          {data.sottotitolo}
        </SectionTitle>

        <Introduction dangerouslySetInnerHTML={{ __html: data.descrizione }} />

        <PrimaryServiceList>
          {primaryServices.map((service, index) => (
            <PrimaryService
              key={service.titolo}
              title={service.titolo}
              citazione={service.citazione}
              image={service.immagine.localFile.childImageSharp.fluid}
              index={index}
              servicesNumber={primaryServices.length}
              uri={
                service.titolo.toLowerCase().substring(0, 9) === 'vigilanza'
                  ? `/vigilanza-antincendio`
                  : service.titolo.toLowerCase()
              }
            />
          ))}
        </PrimaryServiceList>
      </Container>
    </Layout>
  )
}
