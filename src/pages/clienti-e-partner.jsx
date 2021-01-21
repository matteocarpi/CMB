import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import ClientiPrincipali from '../components/ClientiPrincipali'

const Descrizione = styled.section``

const ClientiEPartner = ({ location }) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      clientiPage: wpPage(id: { eq: "cG9zdDoxOTc3OQ==" }) {
        title
        clientiContent {
          descrizione
          clientiprincipali {
            cliente
            logo {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            commissione
            descrizione
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
          altriClienti {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          convenzioniEPartners {
            titolo
            descrizione
            list {
              logo {
                id
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              descrizione
            }
          }
        }
      }
    }
  `)
  const { clientiPage } = data

  const { clientiContent: content } = clientiPage

  return (
    <Layout>
      <Seo title={clientiPage.title} />
      <SectionTitle>{clientiPage.title}</SectionTitle>
      <Descrizione dangerouslySetInnerHTML={{ __html: content.descrizione }} />

      <ClientiPrincipali
        clientiprincipali={content.clientiprincipali}
        location={location}
      />
    </Layout>
  )
}

export default ClientiEPartner
