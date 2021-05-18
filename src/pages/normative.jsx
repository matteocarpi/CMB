import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import Download from '../components/Download'

const NormativeContainer = styled.main``

const NormativeDescription = styled.article``

const NormativeArea = styled.section`
  margin: 30px;
`

const AreaTitle = styled.span`
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 400;
`

const Normativa = styled.div`
  display: flex;
  margin: 0.5rem 0;
`

const NormativaTitle = styled.span`
  font-size: 20px;
`

const DownloadNormativa = styled(Download)`
  margin-left: 1rem;
`
const PrivacyPolicy = () => {
  const data = useStaticQuery(graphql`
    query Normative {
      normative: wpPage(id: { eq: "cG9zdDoyMTU5Nw==" }) {
        title
        normativeContent {
          descrizione
          aree {
            titolo
            normative {
              nome
              allegato {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  `)

  const { title } = data.normative

  return (
    <Layout>
      <Seo
        title={title}
        description={data.normative.normativeContent.descrizione}
        uri="/normative"
      />

      <NormativeContainer>
        <SectionTitle main>{title}</SectionTitle>
        <NormativeDescription
          dangerouslySetInnerHTML={{
            __html: data.normative.normativeContent.descrizione,
          }}
        />

        {data.normative.normativeContent.aree?.map(area => (
          <NormativeArea key={area.titolo}>
            <AreaTitle>{area.titolo}:</AreaTitle>
            {area.normative.map(normativa => (
              <Normativa key={uuidv4()}>
                <NormativaTitle>{normativa.nome}</NormativaTitle>
                <DownloadNormativa
                  tiny
                  url={normativa.allegato?.mediaItemUrl}
                />
              </Normativa>
            ))}
          </NormativeArea>
        ))}
      </NormativeContainer>
    </Layout>
  )
}

export default PrivacyPolicy
