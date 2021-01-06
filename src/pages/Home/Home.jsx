import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Image from 'gatsby-image'

import Layout from '../../components/Layout'
import SEO from '../../components/Seo'
import IntroSlide from '../../components/IntroSlide'
import Badges from '../../components/Badges'
import ClientsPreview from '../../components/ClientsPreview'
import ServicePreview from '../../components/ServicePreview'
import NewsPreview from '../../components/NewsPreview'
import SlidingLogo from '../../components/SlidingLogo'

const IntroWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: -1;
  top: 50px;
`

const Wrapper = styled.div`
  margin-top: calc(60vh);
  min-height: 80vh;
  width: 100%;
  background-color: white;

  @media (max-width: 767px) {
    &:before {
      content: '';
      display: block;
      width: 100px;
      height: 100px;
      align-self: flex-start;
      transform: translate(-50px, -50px) rotate(-45deg);
      background-color: white;
    }
  }

  @media (min-width: 758px) {
    margin-top: calc(100vh);
    background-color: transparent;
  }
`

const Slogan = styled.h1`
  margin: 15px 30px;
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
`

const SloganContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
`

const FirstSlogan = styled.h1`
  margin: 0 2rem 4rem 2rem;
  @media (min-width: 768px) {
    margin: -10rem 2rem 15rem 2rem;
  }
`

const IntroMask = styled.div`
  display: none;
  position: relative;
  min-width: 55%;
  background-color: white;
  min-height: 3rem;
  &:before {
    background-color: white;
    content: '';
    width: 150px;
    height: 150px;
    transform: rotate(45deg) translateY(106px);
    position: absolute;
    z-index: 100;
    top: -9.3rem;
    left: 0;
    z-index: 0;
  }

  @media (min-width: 768px) {
    display: block;
  }
`

const FirstInfoContainer = styled.div`
  max-width: 900px;

  @media (min-width: 768px) {
    align-self: flex-start;
    margin-left: 3rem;
  }
`

const MoreInfoContainer = styled.div`
  @media (min-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 3rem;
  }
`

const MoreInfo = styled.div`
  max-width: 600px;

  @media (min-width: 768px) {
    margin-right: 4rem;
    p {
      margin-top: 0;
    }
  }
`

const StyledSlidingLogo = styled(SlidingLogo)`
  margin-right: 2rem;

  @media (max-width: 768px) {
    display: none;
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
        <IntroSlide img={content.image.localFile.childImageSharp.fluid} />
      </IntroWrapper>
      <Wrapper>
        <SloganContainer>
          <FirstSlogan>{content.slogan1}</FirstSlogan>
          <IntroMask />
        </SloganContainer>
        <Content>
          <TeamImage fluid={content.video.localFile.childImageSharp.fluid} />
          <FirstInfoContainer>
            <p>{content.shortBio}</p>
            <Slogan>{content.slogan2}</Slogan>
          </FirstInfoContainer>

          <MoreInfoContainer>
            <StyledSlidingLogo />
            <MoreInfo>
              <p
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: content.longBio,
                }}
              />
              <Badges badges={content.badges} />
            </MoreInfo>
          </MoreInfoContainer>

          <ServicePreview />

          <ClientsPreview />

          <NewsPreview />
        </Content>
      </Wrapper>
    </Layout>
  )
}

export default Home
