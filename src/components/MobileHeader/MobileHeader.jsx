import React from 'react'
import styled from 'styled-components'
import { Link, useStaticQuery, graphql } from 'gatsby'

import LogoSVG from '../../assets/logo/logo-full-dark.svg'
import BurgerSVG from '../../assets/icons/burger.svg'

const Container = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100px;

  z-index: 10000;
  background-color: white;
  border-bottom: solid 1px lightgrey;
`

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(LogoSVG)`
  margin: 15px;
`

const Burger = styled(BurgerSVG)`
  margin: 30px;
`

const NavigationContainer = styled.nav`
  display: flex;
  justify-content: center;
`

const Navigation = styled.ul``

const NavItem = styled.li`
  margin: 1rem 0;
  font-weight: 200;
  text-transform: uppercase;

  &:hover,
  a.active {
    border-left: solid 1px ${({ theme }) => theme.gold};
    padding-left: calc(0.5rem - 1px);
    margin-left: -0.5rem;
  }
`

export default function MobileHeader() {
  const navigation = useStaticQuery(graphql`
    query Nagivation {
      allWpPage(
        filter: { id: { nin: "cG9zdDo5" } }
        sort: { fields: menuOrder, order: ASC }
      ) {
        edges {
          node {
            title
            slug
            id
          }
        }
      }
    }
  `)

  return (
    <Container>
      <HeaderTop>
        <Link to="/">
          <Logo />
        </Link>
        <Burger />
      </HeaderTop>

      <NavigationContainer>
        <Navigation>
          {navigation.allWpPage.edges.map(page => {
            const p = page.node

            return (
              <NavItem key={p.id}>
                <Link to={`/${p.slug}`} activeClassName="active">
                  {p.title}
                </Link>
              </NavItem>
            )
          })}
        </Navigation>
      </NavigationContainer>
    </Container>
  )
}
