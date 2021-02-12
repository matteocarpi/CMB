import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import { makeSlug } from '../../utils'
import SectionTitle from '../SectionTitle'
import SecondaryServiceTag from '../SecondaryServiceTag'

const Content = styled.section`
  padding-top: 6rem;
  margin-top: 6rem;
  border-top: solid 1px ${({ theme }) => theme.navy};
`

const Navigation = styled.ul`
  display: flex;
  justify-content: space-around;
  @media (min-width: 768px) {
    justify-content: space-between;
    max-width: 900px;
    width: 100%;
    padding: 1rem 0;
    padding-left: 1rem;
  }
`

const NavItem = styled.li`
  list-style: none;
  margin: 2rem 0;
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
  @media (min-width: 768px) {
    h4 {
      font-size: calc(5px + 1vw);
    }
    a {
      h4 {
        font-size: calc(5px + 1vw);
      }
    }
  }
`

const ServiceList = styled.section`
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.navy};
  margin-bottom: 2rem;
  padding: 2rem 0;
`

const PrimaryServicesSecondaryBlock = ({
  pageContext,
  data: secondaryServices,
  location,
}) => {
  const { sottotitolo, primaryServices } = pageContext

  return (
    <>
      <Content>
        <SectionTitle medium uri="/servizi">
          {sottotitolo}
        </SectionTitle>

        <Navigation>
          {primaryServices.map(service => {
            const uri =
              service.titolo.toLowerCase() === 'vigilanza'
                ? `/servizi/${service.titolo.toLowerCase()}/vigilanza`
                : `/servizi/${service.titolo.toLowerCase()}`
            const active = location.pathname.includes(uri)

            return (
              <NavItem active={active} key={uri}>
                {active ? (
                  <h4>{service.titolo}</h4>
                ) : (
                  <Link to={uri}>
                    <h4>{service.titolo}</h4>
                  </Link>
                )}
              </NavItem>
            )
          })}
        </Navigation>

        <ServiceList>
          {secondaryServices.allWpServizio.edges.map(s => {
            const service = s.node
            const hassottoservizi = service.sottoServizi?.hassottoservizi
            const baseUrl = `/servizi/${service.servizioContent.categoria}/${service.slug}/`
            const childSlug =
              hassottoservizi &&
              makeSlug(service.sottoServizi.listasottoservizi[0].titolo)
            const sottoServizioUri = `?article=${childSlug}&index=0`
            const uri = hassottoservizi
              ? `${baseUrl}${sottoServizioUri}`
              : baseUrl

            return (
              <SecondaryServiceTag
                key={service.id}
                title={service.title}
                uri={uri}
              />
            )
          })}
        </ServiceList>
      </Content>
    </>
  )
}

export default PrimaryServicesSecondaryBlock
