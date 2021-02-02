import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import { makeSlug } from '../../utils'
import SectionTitle from '../SectionTitle'
import SecondaryServiceTag from '../SecondaryServiceTag'

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
  list-style: none;
  margin: 2rem 0;
  a {
    h4 {
      font-size: calc(5px + 1vw);
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
  justify-content: space-between;
  margin: 0 auto;

  @media (min-width: 768px) {
    &:after {
      content: '';
      flex: auto;
    }
  }
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
                <Link to={uri}>
                  <h4>{service.titolo}</h4>
                </Link>
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
