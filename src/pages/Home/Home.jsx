import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import IntroSlide from '../../components/IntroSlide'

const IntroWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: -1;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70vh;
  height: 70vh;
  width: 100%;
  background-color: white;

  &:before {
    content: '';
    display: block;
    width: 100px;
    height: 100px;
    align-self: flex-start;
    transform: translate(-50px, -50px) rotate(-45deg);
    background-color: white;
  }
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

  const content = data.wpPage.homeContent

  return (
    <Layout>
      <SEO title={data.wpPage.title} />
      <IntroWrapper>
        <IntroSlide
          img={data.wpPage.homeContent.image.localFile.childImageSharp.fluid}
        />
      </IntroWrapper>
      <Content>
        <h1>{content.slogan1}</h1>
      </Content>
    </Layout>
  )
}

export default Home
