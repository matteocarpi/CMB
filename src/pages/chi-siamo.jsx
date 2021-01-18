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
  display: flex;
  flex-direction: column;
`

const Descrizione = styled.article``

const StyledLogo = styled(Logo)`
  float: left;
  margin: 0 2rem 1rem 2rem;
  max-width: 20%;
  height: 100%;
`

const LogoDescription = styled.section`
  p {
    margin-top: 0;
  }

  @media (min-width: 768px) {
    width: 60%;
    align-self: flex-end;
    margin-bottom: 2rem;
  }
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
  p {
    margin: 0 22px;
  }
  @media (min-width: 768px) {
    margin: 8rem 0;
  }
`
const DownloadWrapper = styled.section`
  display: flex;
  align-items: center;
  width: 90%;
  margin-top: 1rem;
`

const Subtitle = styled.h5`
  margin: 0 22px;
  font-size: 22px;
`

const Certificazioni = styled.section`
  p {
    margin: 0 22px;
  }
`

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
            subtitle
            descrizione
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
        <LogoDescription>
          <StyledLogo />
          <Descrizione
            dangerouslySetInnerHTML={{
              __html: content.descrizione2,
            }}
          />
        </LogoDescription>

        <Image fluid={content.immagine.localFile.childImageSharp.fluid} />
        <Descrizione
          dangerouslySetInnerHTML={{
            __html: content.descrizione3,
          }}
        />

        <Badges badges={badges} />

        <Organigramma>
          <SectionTitle tiny>{content.organigramma.title}</SectionTitle>
          <Descrizione
            dangerouslySetInnerHTML={{
              __html: content.organigramma.descrizione,
            }}
          />
          <DownloadWrapper>
            <Subtitle>{content.organigramma.subtitle}</Subtitle>
            <Download url={content.organigramma.allegato.mediaItemUrl} />
          </DownloadWrapper>
        </Organigramma>

        <Certificazioni>
          <SectionTitle tiny>{content.certificazioni.title}</SectionTitle>
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
