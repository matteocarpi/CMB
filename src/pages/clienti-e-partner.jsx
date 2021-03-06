import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { graphql } from 'gatsby'
import { motion, AnimatePresence } from 'framer-motion'

import Image from 'gatsby-image'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import ClientiPrincipali from '../components/ClientiPrincipali'
import PlusIcon from '../assets/icons/plus.svg'
import MinusIcon from '../assets/icons/minus.svg'

const Descrizione = styled.section``

const ShowAllClients = styled.button`
  background-color: ${({ theme }) => theme.navy};
  width: 100%;
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
      svg {
        path {
          stroke: ${({ theme }) => theme.gold};
        }
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
const AllClients = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 6rem;
`

const AltriClienti = styled(motion.div)`
  background-color: ${({ theme }) => theme.navy};
  padding-bottom: 2rem;
  margin: 0 auto;
  transform-origin: center top;
  width: 100%;
`

const ClientiList = styled.ul`
  width: max-content;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
`

const Cliente = styled.li`
  color: white;
  white-space: nowrap;
  width: min-content;
  margin: 1rem 2rem;
`

const PartnersWrapper = styled.section`
  margin: 5rem 0;

  p {
    margin-bottom: 0;
  }
`

const PartnersContainer = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1440px;
  margin: 0 auto;
`

const Partner = styled.article`
  margin: 4rem 0 0 0;
  max-width: 400px;
`

const PartnerDescription = styled.article`
  margin-bottom: 0;
  p {
    margin: 1rem 30px;
  }
`

const PartnerLogo = styled(Image)`
  max-width: 300px;
  height: 150px;
  margin: 0 30px;

  picture {
    img {
      object-fit: contain !important;
      object-position: left bottom !important;
    }
  }
`

const otherClientsVariants = {
  hidden: {
    scaleY: 0,
  },
  visible: {
    scaleY: 1,
  },
  exit: {
    scaleY: 0,
  },
}

const ClientiEPartner = ({ data, location }) => {
  const [showAllClients, setShowAllClients] = useState(false)

  const { clientiPage } = data

  const { clientiContent: content } = clientiPage

  return (
    <Layout>
      <Seo
        title={clientiPage.title}
        description={content.descrizione}
        uri="clienti-e-partner"
      />
      <SectionTitle main>{clientiPage.title}</SectionTitle>
      <Descrizione dangerouslySetInnerHTML={{ __html: content.descrizione }} />
      <ClientiPrincipali location={location} />
      <AllClients>
        <ShowAllClients
          active={showAllClients}
          onClick={() => setShowAllClients(!showAllClients)}
        >
          <span>Mostra tutti i clienti</span>
          {!showAllClients ? <Plus /> : <Minus />}
        </ShowAllClients>
        <AnimatePresence>
          {showAllClients && (
            <AltriClienti
              variants={otherClientsVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ClientiList>
                {content.altriClienti.map(client => (
                  <Cliente key={client.cliente}>{client.cliente}</Cliente>
                ))}
              </ClientiList>
            </AltriClienti>
          )}
        </AnimatePresence>
      </AllClients>

      <PartnersWrapper>
        <SectionTitle long main>
          {content.convenzioniEPartners.titolo}
        </SectionTitle>

        <Descrizione
          dangerouslySetInnerHTML={{
            __html: content.convenzioniEPartners.descrizione,
          }}
        />
        <PartnersContainer>
          {content.convenzioniEPartners.list.map(partner => (
            <Partner key={partner.logo.id}>
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

export const data = graphql`
  query MyQuery {
    clientiPage: wpPage(id: { eq: "cG9zdDoxOTc3OQ==" }) {
      title
      clientiContent {
        descrizione
        clientiprincipali {
          cliente
          logo {
            localFile {
              id
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          commissione
          descrizione
          videoOFoto
          video {
            mp4 {
              mediaItemUrl
            }
            webm {
              mediaItemUrl
            }
          }
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
          cliente
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
`
