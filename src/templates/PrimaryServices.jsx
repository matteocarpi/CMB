import React from 'react'
import { Link, graphql } from 'gatsby'
import styled, { css } from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import SecondaryServiceThumb from '../components/SecondaryServiceThumb'

const Content = styled.section`
  margin-top: 130px;
`

const Navigation = styled.ul`
  margin-left: 2rem;
`

const NavItem = styled.li`
  margin: 2rem 0;
  a {
    font-family: Cinzel, serif;
    font-size: 20px;
    ${({ active }) =>
      active &&
      css`
        border-bottom: solid 1px ${({ theme }) => theme.gold};
      `}

    &:hover {
      border-bottom: solid 1px ${({ theme }) => theme.gold};
    }
  }
`

const ServiceList = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const PrimaryServices = ({
  pageContext,
  data: secondaryServices,
  location,
}) => {
  const { titolo, sottotitolo, primaryServices } = pageContext

  return (
    <Layout>
      <Seo title={titolo} />
      <Content>
        <SectionTitle>{sottotitolo}</SectionTitle>

        <Navigation>
          {primaryServices.map(service => {
            const uri = `/servizi/${service.titolo.toLowerCase()}`
            const active = uri === location.pathname

            return (
              <NavItem active={active} key={uri}>
                <Link to={uri}>{service.titolo}</Link>
              </NavItem>
            )
          })}
        </Navigation>

        <ServiceList>
          {secondaryServices.allWpServizio.edges.map(s => {
            const service = s.node
            const uri = service.slug
            return (
              <SecondaryServiceThumb
                key={service.id}
                title={service.title}
                image={
                  service.servizioContent.immagine.localFile.childImageSharp
                    .fluid
                }
                uri={uri}
              />
            )
          })}
        </ServiceList>
      </Content>
    </Layout>
  )
}

export default PrimaryServices

export const data = graphql`
  query MyQuery($category: String) {
    allWpServizio(
      filter: { servizioContent: { categoria: { eq: $category } } }
    ) {
      edges {
        node {
          id
          title
          servizioContent {
            immagine {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 500) {
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
