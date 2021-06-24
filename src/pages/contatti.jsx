import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import ContactForm from '../components/ContactForm'

const Container = styled.section`
  margin: 4rem 0;
  width: 100%;
`

const InfoWrapper = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 1290px) {
    flex-direction: column;
    margin-left: 1rem;
  }
`
const ContactWrapper = styled.p`
  margin: 0 15px;
`

const Contact = styled.a``

const MainLocation = styled.article`
  max-width: 550px;
  margin-bottom: 2rem;
  @media (min-width: 1290px) {
    margin-left: 15px;
    margin-bottom: 0;
  }
`

const OtherLocations = styled.article``

const Location = styled.div`
  margin-bottom: 2rem;
`

const Name = styled.h5`
  text-transform: uppercase;
  font-weight: 400;
  margin-left: 15px;
`

const Address = styled.p`
  margin-top: 0;
  margin: 0 15px;
`

const SocialContainer = styled.div`
  display: flex;
`

const SocialIcon = styled(FontAwesomeIcon)`
  margin-right: 1rem;
  path {
    fill: ${({ theme }) => theme.navy};
  }
`

const Contatti = ({ data }) => {
  const { contattiContent: content } = data.wpPage

  const map = getImage(content.mappa.localFile.childImageSharp.gatsbyImageData)

  return (
    <Layout>
      <Seo
        title={data.wpPage.title}
        description="Contattaci per un avere più informazioni"
        uri="/contatti"
      />
      <SectionTitle main>{data.wpPage.title}</SectionTitle>

      <Container>
        <InfoWrapper>
          <MainLocation>
            <Location>
              <Name>{content.sedelegale.nome} (Sede Legale)</Name>
              <Address>{content.sedelegale.indirizzo}</Address>
              <br />
              <ContactWrapper>
                Tel:{' '}
                {content.contatti.telefono.map((telefono, index) => (
                  <Contact
                    key={telefono.numero}
                    href={`tel: ${telefono.numero}`}
                  >
                    {telefono.numero}{' '}
                    {index + 1 !== content.contatti.telefono.length && ' /'}
                  </Contact>
                ))}
              </ContactWrapper>

              <ContactWrapper>
                Fax: <Contact>{content.contatti.fax}</Contact>
              </ContactWrapper>

              <br />
              <ContactWrapper>
                Mail:{' '}
                <Contact href={`mailto:${content.contatti.mail}`}>
                  {content.contatti.mail}
                </Contact>
              </ContactWrapper>
              <ContactWrapper>
                Pec: <Contact>{content.contatti.pec}</Contact>
              </ContactWrapper>

              <ContactWrapper>
                <SocialContainer>
                  <a
                    href="https://www.facebook.com/CMB.Consulting.srl/?ref=page_internal"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SocialIcon icon={faFacebook} />
                  </a>
                  <a
                    href="https://it.linkedin.com/company/gruppo-cmb-consulting"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SocialIcon icon={faLinkedin} />
                  </a>
                </SocialContainer>
              </ContactWrapper>
            </Location>
          </MainLocation>

          <OtherLocations>
            {content.sedi.map((sede, index) => {
              if (index <= (content.sedi.length - 1) / 2) {
                return (
                  <Location key={sede.indirizzo}>
                    <Name>{sede.nome}</Name>
                    <Address>{sede.indirizzo}</Address>
                  </Location>
                )
              }
            })}
          </OtherLocations>

          <OtherLocations>
            {content.sedi.map((sede, index) => {
              if (index > (content.sedi.length - 1) / 2) {
                return (
                  <Location key={sede.indirizzo}>
                    <Name>{sede.nome}</Name>
                    <Address>{sede.indirizzo}</Address>
                  </Location>
                )
              }
            })}
          </OtherLocations>
        </InfoWrapper>

        <GatsbyImage image={map} />

        <ContactForm
          titolo={content.form.titolo}
          sottotitolo={content.form.sottotitolo}
        />
      </Container>
    </Layout>
  )
}

export default Contatti

export const data = graphql`
  query Contatti {
    wpPage(id: { eq: "cG9zdDoyMDE2Ng==" }) {
      title
      contattiContent {
        mappa {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        sedelegale {
          nome
          indirizzo
        }
        sedi {
          indirizzo
          nome
        }
        contatti {
          telefono {
            numero
          }
          fax
          mail
          pec
        }
        form {
          titolo
          sottotitolo
        }
      }
    }
  }
`
