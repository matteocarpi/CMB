import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Image from 'gatsby-image'

import Layout from '../../components/Layout'
import SEO from '../../components/Seo'
import IntroSlide from '../../components/IntroSlide'

const IntroWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: -1;
`

const Wrapper = styled.div`
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

const Slogan = styled.h1`
  width: min-content;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -50px;
  background-color: white;
`
const TeamImage = styled(Image)`
  width: 100%;
  margin-top: 30px;
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
          longBio
          slogan1
          slogan2
          video {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
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
      <Wrapper>
        <Content>
          <Slogan>{content.slogan1}</Slogan>
          <TeamImage fluid={content.video.localFile.childImageSharp.fluid} />
          <p>{content.shortBio}</p>
        </Content>
      </Wrapper>
    </Layout>
  )
}

export default Home
