import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import Logo from '../assets/logo/logo-lines.svg'
import Badges from '../components/Badges'
import Download from '../components/Download'
import Attachment from '../components/Attachment'

const Container = styled.section`
  margin: 2rem 0;
`

const Descrizione = styled.article`
  margin: 0 0 2rem 0;
`

const StyledLogo = styled(Logo)`
  float: left;
  margin: 0 2rem 1rem 2rem;
  max-width: 20%;
  height: 100%;
`

const Image = styled(Img)`
  width: 100%;
  min-height: 80vh;
`

const Organigramma = styled.section`
  width: 100%;
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  h5 {
    margin-bottom: 2rem;
  }
`

const Certificazioni = styled.section``

const AttachmentWrapper = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

const ChiSiamo = () => {
  const data = useStaticQuery(graphql`
    query ChiSiamo {
      chiSiamo: wpPage(id: { eq: "cG9zdDoyMDE0NQ==" }) {
        title
        chiSiamoContent {
          descrizione1
          descrizione2
          immagine {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          descrizione3
          organigramma {
            title
            allegato {
              mediaItemUrl
            }
          }
          certificazioni {
            title
            descrizione
            allegati {
              nomeCertificazione
              file {
                mediaItemUrl
              }
            }
          }
        }
      }
      home: wpPage(id: { eq: "cG9zdDo5" }) {
        homeContent {
          badges {
            number
            title
          }
        }
      }
    }
  `)

  const content = data.chiSiamo.chiSiamoContent

  const { badges } = data.home.homeContent

  return (
    <Layout>
      <Seo title={data.chiSiamo.title} />
      <Container>
        <SectionTitle>{data.chiSiamo.title}</SectionTitle>

        <Descrizione
          dangerouslySetInnerHTML={{
            __html: content.descrizione1,
          }}
        />

        <StyledLogo />

        <Descrizione
          dangerouslySetInnerHTML={{
            __html: content.descrizione2,
          }}
        />

        <Image fluid={content.immagine.localFile.childImageSharp.fluid} />
        <Descrizione
          dangerouslySetInnerHTML={{
            __html: content.descrizione3,
          }}
        />

        <Badges badges={badges} />

        <Organigramma>
          <h5>{content.organigramma.title}</h5>
          <Download url={content.organigramma.allegato.mediaItemUrl} />
        </Organigramma>

        <Certificazioni>
          <SectionTitle>{content.certificazioni.title}</SectionTitle>
          <Descrizione
            dangerouslySetInnerHTML={{
              __html: content.certificazioni.descrizione,
            }}
          />
          <AttachmentWrapper>
            {content.certificazioni.allegati?.map(a => (
              <Attachment
                key={a.nomeCertificazione}
                title={a.nomeCertificazione}
                url={a.file.mediaItemUrl}
              />
            ))}
          </AttachmentWrapper>
        </Certificazioni>
      </Container>
    </Layout>
  )
}
export default ChiSiamo
