import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import Image from 'gatsby-image'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import ClientiPrincipali from '../components/ClientiPrincipali'
import PlusIcon from '../assets/icons/plus.svg'
import MinusIcon from '../assets/icons/minus.svg'

const Descrizione = styled.section``

const ShowAllClients = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.navy};
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: white;
  }

  ${({ active }) =>
    active &&
    css`
      span {
        color: ${({ theme }) => theme.gold};
      }
    `}

  @media (min-width: 768px) {
    &:hover {
      span {
        color: ${({ theme }) => theme.gold};
      }
    }
  }
`

const Plus = styled(PlusIcon)`
  margin: 0 1rem;
`
const Minus = styled(MinusIcon)`
  margin: 0 1rem;
  stroke: ${({ theme }) => theme.gold};
`

const AltriClienti = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

const ClientLogo = styled(Image)`
  width: 40%;
  margin: 1rem;

  picture {
    img {
      object-fit: contain !important;
    }
  }
`

const PartnersWrapper = styled.section`
  margin: 2rem 0;
`

const PartnersContainer = styled.section`
  margin-top: 2rem;
`

const Partner = styled.article`
  margin: 4rem 0;
`

const PartnerDescription = styled.article`
  p {
    margin: 1rem 30px;
  }
`

const PartnerLogo = styled(Image)`
  max-width: 300px;
  max-height: 150px;
  margin: 0 30px;

  picture {
    img {
      object-fit: contain !important;
      object-position: left center !important;
    }
  }
`

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

  const [showAllClients, setShowAllClients] = useState(false)

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

      <ShowAllClients
        active={showAllClients}
        onClick={() => setShowAllClients(!showAllClients)}
      >
        <span>Mostra tutti i clienti</span>
        {!showAllClients ? <Plus /> : <Minus />}
      </ShowAllClients>

      {showAllClients && (
        <AltriClienti>
          {content.altriClienti.map(client => (
            <ClientLogo
              fluid={client.localFile.childImageSharp.fluid}
              key={client.localFile.childImageSharp.fluid.src}
            />
          ))}
        </AltriClienti>
      )}

      <PartnersWrapper>
        <SectionTitle>{content.convenzioniEPartners.titolo}</SectionTitle>

        <Descrizione
          dangerouslySetInnerHTML={{
            __html: content.convenzioniEPartners.descrizione,
          }}
        />
        <PartnersContainer>
          {content.convenzioniEPartners.list.map(partner => (
            <Partner>
              <PartnerLogo
                fluid={partner.logo.localFile.childImageSharp.fluid}
              />
              <PartnerDescription
                dangerouslySetInnerHTML={{ __html: partner.descrizione }}
              />
            </Partner>
          ))}
        </PartnersContainer>
      </PartnersWrapper>
    </Layout>
  )
}

export default ClientiEPartner
