import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
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
  flex-wrap: wrap;
`
const ContactWrapper = styled.p`
  margin: 0 2rem;
`

const Contact = styled.a``

const MainLocation = styled.article``

const OtherLocations = styled.article``

const Location = styled.div`
  margin-bottom: 2rem;
`

const Name = styled.h5`
  text-transform: uppercase;
  font-weight: 400;
  margin-left: 30px;
`

const Address = styled.p`
  margin-top: 0;
`

const Contatti = () => {
  const data = useStaticQuery(graphql`
    query Contatti {
      wpPage(id: { eq: "cG9zdDoyMDE2Ng==" }) {
        title
        contattiContent {
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
  `)

  const { contattiContent: content } = data.wpPage

  return (
    <Layout>
      <Seo title={data.wpPage.title} />
      <SectionTitle main>{data.wpPage.title}</SectionTitle>

      <Container>
        <InfoWrapper>
          <MainLocation>
            <Location>
              <Name>{content.sedelegale.nome} (Sede Legale)</Name>
              <Address>{content.sedelegale.indirizzo}</Address>
              <br />
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

        <iframe
          title="map"
          src="https://snazzymaps.com/embed/286904"
          width="100%"
          height="600px"
          style={{ border: 'none', marginTop: '2rem' }}
        />

        <ContactForm
          titolo={content.form.titolo}
          sottotitolo={content.form.sottotitolo}
        />
      </Container>
    </Layout>
  )
}

export default Contatti
