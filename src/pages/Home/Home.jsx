import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-background-image'
import ColoredBackgroundImage from '../../components/ColoredBackgroundImage'

import Layout from '../../components/layout'
import SEO from '../../components/seo'

const Image = styled(ColoredBackgroundImage)`
  height: 80vh;
  width: 100%;
`

const ColorOverlay = styled.div`
  opacity: 0.5;
  width: 100%;
  height: 100%;
  position: absolute;
`

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
      <Image
        fluid={data.wpPage.homeContent.image.localFile.childImageSharp.fluid}
        color="#090F2D"
        opacity={0.9}
      />
    </Layout>
  )
}

export default Home
