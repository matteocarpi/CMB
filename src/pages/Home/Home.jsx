import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import IntroSlide from '../../components/IntroSlide'

const Home = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(id: { eq: "cG9zdDo5" }) {
        title
        homeContent {
          image {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          shortBio
          shortBioCopy
          slogan1
          slogan2
          video {
            uri
            mediaItemUrl
          }
          badges {
            number
            title
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title={data.wpPage.title} />
      <IntroSlide
        img={data.wpPage.homeContent.image.localFile.childImageSharp.fluid}
      />
    </Layout>
  )
}

export default Home
