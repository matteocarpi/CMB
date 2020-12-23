import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { motion, AnimatePresence } from 'framer-motion'

import LogoSVG from '../../assets/logo/logo-full-dark.svg'
import BurgerSVG from '../../assets/icons/burger.svg'
import CloseSVG from '../../assets/icons/close.svg'

const Container = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100px;
  z-index: 10000;
  background-color: white;
  /* border-bottom: solid 1px lightgrey; */
  background-color: transparent;
`

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`

const Logo = styled(LogoSVG)`
  margin: 15px;
`

const Burger = styled(BurgerSVG)`
  margin: 0 30px;
`
const Close = styled(CloseSVG)`
  margin: 0 30px;
`

const NavigationContainer = styled(motion.nav)`
  display: flex;
  justify-content: center;
  background-color: white;
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

const navigationVariants = {
  hidden: {
    scaleY: 0,
    originY: 'top',
  },
  visible: {
    scaleY: 1,
    originY: 'top',
  },
}

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const navigation = useStaticQuery(graphql`
    query Navigation {
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
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? <Burger /> : <Close />}
        </button>
      </HeaderTop>

      <AnimatePresence>
        {isOpen && (
          <NavigationContainer
            variants={navigationVariants}
            initial="hidden"
            animate="visible"
            exit={{ scaleY: 0 }}
          >
            <Navigation>
              {navigation.allWpPage.edges.map(page => {
                const p = page.node

                return (
                  <NavItem key={p.id}>
                    <Link to={`/${p.slug}`} activeClassName="active">
                      {isOpen && p.title}
                    </Link>
                  </NavItem>
                )
              })}
            </Navigation>
          </NavigationContainer>
        )}
      </AnimatePresence>
    </Container>
  )
}
