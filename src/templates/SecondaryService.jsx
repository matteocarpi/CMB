import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PrimaryServicesBlock from '../components/PrimaryServicesBlock'

const Container = styled.section`
  margin-top: 3rem;
`

const Image = styled(Img)`
  display: none;
  height: 50vh;
  min-height: 300px;

  picture {
    img {
      object-position: top center !important;
    }
  }

  @media (min-width: 768px) {
    display: block;
  }
`

const Description = styled.article`
  @media (max-width: 767px) {
    p {
      margin-bottom: 0;
    }
  }
`

const Title = styled.h5`
  margin: 0 auto;
  padding-left: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: solid 1px ${({ theme }) => theme.gold};
  width: 90%;

  @media (min-width: 768px) {
    max-width: 850px;
    margin: 0 0 0 1.5rem;
  }
`

const SecondaryService = ({ data, pageContext, location }) => {
  const servizio = data.wpServizio

  return (
    <Layout>
      <Seo title={servizio.title} />

      <Image
        fluid={
          servizio.servizioContent.immagine.localFile.childImageSharp.fluid
        }
      />
      <Container>
        <Title>{servizio.title}</Title>

        <Description
          dangerouslySetInnerHTML={{
            __html: servizio.servizioContent.descrizione,
          }}
        />
      </Container>
      <PrimaryServicesBlock
        pageContext={pageContext}
        data={data}
        location={location}
      />
    </Layout>
  )
}

export default SecondaryService

export const data = graphql`
  query ServizioQuery($id: String!, $category: String!) {
    wpServizio(id: { eq: $id }) {
      title
      servizioContent {
        descrizione
        immagine {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        hasSottoServizi
        sottoServizi {
          titolo
          listaSottoServizi {
            titolo
            descrizione
          }
        }
      }
    }
    allWpServizio(
      filter: { servizioContent: { categoria: { eq: $category } } }
    ) {
      edges {
        node {
          id
          title
          servizioContent {
            categoria
            immagine {
              localFile {
                childImageSharp {
                  fluid(maxHeight: 500) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
          slug
        }
      }
    }
  }
`
