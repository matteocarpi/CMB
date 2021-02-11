import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Image from 'gatsby-image'

import Layout from '../../components/Layout'
import SEO from '../../components/Seo'
import IntroSlide from '../../components/IntroSlide'
import Badges from '../../components/Badges'
import ClientiPrincipali from '../../components/ClientiPrincipali'
import ServicePreview from '../../components/ServicePreview'
import NewsPreview from '../../components/NewsPreview'
import SlidingLogo from '../../components/SlidingLogo'
import SlidingLogoMobile from '../../components/SlidingLogoMobile'
import SectionTitle from '../../components/SectionTitle'

const IntroWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: -1;
  top: 50px;
`

const Wrapper = styled.div`
  margin-top: 50px;
  min-height: 80vh;
  width: 100%;
  background-color: white;

  @media (min-width: 758px) {
    background-color: transparent;
  }
`

const SecondSlogan = styled.h1`
  margin: 3rem 30px;
  text-align: center;
  font-size: calc(22px + 2vw);
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
  position: relative;
  width: 100%;
  z-index: 2;
  &:after {
    content: '';
    position: absolute;
    background: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.8),
      white
    );
    height: 300px;
    bottom: 0;
    right: 0;
    left: 0;
  }
  &:before {
    content: '';
    position: absolute;
    width: 300px;
    bottom: 0;
    top: 0;
    left: 0;
    z-index: 3;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.8),
      white
    );
  }
`

const SloganContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: -100px;
  @media (max-width: 980px) {
    background-color: white;
    background: transparent;
  }
`

const halfDiagonal = Math.sqrt((100 / 2) ** 2 * 2)

const FirstSlogan = styled.h1`
  display: block;
  padding-bottom: 20vh;
  margin-top: 0;
  padding-top: calc(100vh - 155.6px);
  z-index: 1;
  font-size: calc(22px + 2vw);
  @media (max-width: 980px) {
    padding: 2rem 0 2rem 2rem;
    margin: 0;
    margin-top: calc(80vh - 120px);
    background: white;
    position: relative;
    width: 100%;
    &:after {
      content: '';
      width: 100px;
      height: 100px;
      background-color: white;
      position: absolute;
      top: -${halfDiagonal}px;
      left: -${halfDiagonal}px;
      transform: rotate(45deg) translate(14px, 16px);
    }
  }
`

const IntroMask = styled.div`
  display: none;
  position: sticky;
  bottom: 0;
  min-width: 55%;
  background-color: white;
  @media (min-width: 980px) {
    display: block;

    &:before {
      content: '';
      width: 150px;
      height: 150px;
      background-color: white;
      position: absolute;
      top: -75px;
      left: -75px;
      transform: rotate(45deg);
    }
  }
`

const FirstInfoContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    align-self: flex-start;
  }
`

const MoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    align-items: flex-start;
    flex-direction: row;
  }
`

const MoreInfo = styled.div`
  max-width: 600px;

  @media (max-width: 767px) {
    p {
      margin-top: 0;
    }
  }

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
const StyledSlidingLogoMobile = styled(SlidingLogoMobile)`
  margin: 0 2rem;
  margin-top: 0.5rem;
  width: 100px;
  max-height: 200px;
  display: none;
  float: left;
  @media (max-width: 768px) {
    display: flex;
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
          servizi {
            consulenza {
              citazione
              informazioni
              immagine {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              titolo
            }
            formazione {
              citazione
              informazioni
              immagine {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              titolo
            }
            vigilanza {
              citazione
              informazioni
              immagine {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              titolo
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
      <SloganContainer>
        <FirstSlogan dangerouslySetInnerHTML={{ __html: content.slogan1 }} />
        <IntroMask />
      </SloganContainer>
      <Wrapper>
        <Content>
          <TeamImage fluid={content.video.localFile.childImageSharp.fluid} />
          <FirstInfoContainer>
            <p>{content.shortBio}</p>
            <SecondSlogan>{content.slogan2}</SecondSlogan>
          </FirstInfoContainer>
          <MoreInfoContainer>
            <StyledSlidingLogo />
            <MoreInfo>
              <StyledSlidingLogoMobile />
              <p
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: content.longBio,
                }}
              />
              <Badges badges={content.badges} />
            </MoreInfo>
          </MoreInfoContainer>

          <ServicePreview services={content.servizi} />

          <SectionTitle sub uri="/clienti">
            Clienti
          </SectionTitle>
          <ClientiPrincipali home />
          <NewsPreview />
        </Content>
      </Wrapper>
    </Layout>
  )
}

export default Home
