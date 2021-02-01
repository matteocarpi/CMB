import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PrimaryServicesBlock from '../components/PrimaryServicesBlock'

const PrimaryServices = ({
  pageContext,
  data: secondaryServices,
  location,
}) => (
  <Layout>
    <Seo
      title={secondaryServices.serviziPage.title}
      description={secondaryServices.serviziPage.serviziContent.descrizione}
      uri={location.pathname}
    />
    <PrimaryServicesBlock
      pageContext={pageContext}
      data={secondaryServices}
      location={location}
    />
  </Layout>
)

export default PrimaryServices

export const data = graphql`
  query PrimaryServices($category: String) {
    allWpServizio(
      filter: { servizioContent: { categoria: { eq: $category } } }
    ) {
      edges {
        node {
          id
          title
          sottoServizi {
            hassottoservizi
            listasottoservizi {
              titolo
              descrizione
            }
            titolo
          }
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
    serviziPage: wpPage(id: { eq: "cG9zdDoxOTgwMg==" }) {
      title
      serviziContent {
        descrizione
      }
    }
  }
`
