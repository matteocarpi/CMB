import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import Seo from '../Seo'
import SectionTitle from '../SectionTitle'
import SecondaryServiceThumb from '../SecondaryServiceThumb'

const Content = styled.section`
  @media (min-width: 768px) {
    padding: 0 1.8rem;
  }
`

const Navigation = styled.ul`
  padding-left: 2rem;
  @media (min-width: 768px) {
    max-width: 900px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 1rem 0;
    padding-left: 1rem;
  }
`

const NavItem = styled.li`
  margin: 2rem 0;
  a {
    h4 {
      font-size: calc(10px + 1vw);
      width: min-content;
      padding-bottom: 0.7rem;
      ${({ active }) =>
        active &&
        css`
          border-bottom: solid 2px ${({ theme }) => theme.gold};
        `}

      &:hover {
        border-bottom: solid 2px ${({ theme }) => theme.gold};
      }
    }
  }

  @media (min-width: 1000px) {
    a {
      h4 {
        width: 130%;
      }
    }
  }
`

const ServiceList = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const PrimaryServicesBlock = ({
  pageContext,
  data: secondaryServices,
  location,
}) => {
  const { titolo, sottotitolo, primaryServices } = pageContext

  return (
    <>
      <Seo title={titolo} />
      <Content>
        <SectionTitle>{sottotitolo}</SectionTitle>

        <Navigation>
          {primaryServices.map(service => {
            const uri = `/servizi/${service.titolo.toLowerCase()}`
            const active = location.pathname.includes(uri)

            return (
              <NavItem active={active} key={uri}>
                <Link to={uri} replace>
                  <h4>{service.titolo}</h4>
                </Link>
              </NavItem>
            )
          })}
        </Navigation>

        <ServiceList>
          {secondaryServices.allWpServizio.edges.map(s => {
            const service = s.node
            const uri = `/servizi/${service.servizioContent.categoria}/${service.slug}`
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
    </>
  )
}

export default PrimaryServicesBlock
