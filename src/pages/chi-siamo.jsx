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
  height: 100%;
  display: flex;
  padding: 0.5rem 0;

  @media (max-width: 767px) {
    height: 200px;
  }
`
const LogoWrapper = styled.div`
  height: 100%;
  width: 80%;
  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
    float: left;
    width: 30%;
    margin: 0 1rem 0.5rem 2rem;

    @media (min-width: 768px) {
      justify-content: flex-end;
    }
  }

  @media (min-width: 768px) {
    height: 200px;
    width: unset;
  }
`

const LogoDescription = styled.section`
  margin-top: 2rem;
  p {
    margin-top: 0;
    max-width: 600px;
  }

  @media (min-width: 768px) {
    align-self: flex-end;
    margin-bottom: 2rem;
    display: flex;
    align-items: stretch;
  }
`

const Image = styled(Img)`
  width: 100%;
  min-height: 80vh;

  @media (max-width: 767px) {
    margin: 2rem 0 0 0;
  }
`

const Futura = styled.section`
  width: 100%;
  margin-bottom: 8rem;
  display: flex;
  flex-direction: column;
  p {
    margin: 0 22px;
  }
  @media (min-width: 768px) {
    margin-bottom: 8rem;
  }
`

const Brochure = styled.section`
  width: 100%;
  margin: 8rem 0;
  display: flex;
  flex-direction: column;
  p {
    margin: 0 22px;
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
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex-direction: row;
  }
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
          brochure {
            title
            subtitle
            descrizione
            allegato {
              mediaItemUrl
            }
          }
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
          sicurezza {
            title
            descrizione
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
      <Seo
        title={data.chiSiamo.title}
        description={content.descrizione1}
        uri="/chi-siamo"
      />
      <Container>
        <SectionTitle main>{data.chiSiamo.title}</SectionTitle>

        <Descrizione
          dangerouslySetInnerHTML={{
            __html: content.descrizione1,
          }}
        />
        <LogoDescription>
          <LogoWrapper>
            <StyledLogo />
          </LogoWrapper>
          <Descrizione
            dangerouslySetInnerHTML={{
              __html: content.descrizione2,
            }}
          />
        </LogoDescription>

        <Image fluid={content.immagine.localFile.childImageSharp.fluid} />
        <Descrizione
          style={{ marginBottom: '2rem' }}
          dangerouslySetInnerHTML={{
            __html: content.descrizione3,
          }}
        />

        <Badges big badges={badges} />

        <Brochure>
          <SectionTitle tiny>{content.brochure.title}</SectionTitle>
          <Descrizione
            dangerouslySetInnerHTML={{
              __html: content.brochure.descrizione,
            }}
          />
          <DownloadWrapper>
            <Subtitle>{content.brochure.subtitle}</Subtitle>
            <Download url={content.brochure.allegato.mediaItemUrl} />
          </DownloadWrapper>
        </Brochure>

        <Futura>
          <SectionTitle tiny long>
            {content.sicurezza.title}
          </SectionTitle>
          <Descrizione
            dangerouslySetInnerHTML={{
              __html: content.sicurezza.descrizione,
            }}
          />
          <DownloadWrapper>
            <Subtitle>Maggiori Informazioni</Subtitle>
            <Download link url="/centro-futura" />
          </DownloadWrapper>
        </Futura>

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
