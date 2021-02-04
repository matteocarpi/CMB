import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import LogoSVG from '../../assets/logo/logo-full-light.svg'

const Wrapper = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.navy};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 4rem 2rem;
  }
`

const Left = styled.div`
  flex-basis: 0;
  flex-grow: 1;
`

const Center = styled.div`
  flex-basis: 0;
  flex-grow: 1;
`

const Right = styled.div`
  flex-basis: 0;
  flex-grow: 1;
`

const Bottom = styled.p`
  color: white;
  margin: 0 auto;
  padding: 1rem 2rem;
  font-size: 12px;
  text-align: center;
`

const Logo = styled(LogoSVG)`
  margin-bottom: 1rem;
`
const Menu = styled.ul``

const MenuItem = styled.li`
  margin: 1rem 0;
  list-style: none;
  a {
    color: white;

    &:visited {
      color: white;
    }
  }
`
const Contacts = styled.ul`
  margin-top: 2rem;
  @media (min-width: 768px) {
    margin-top: 0;
  }
`

const ContactInfo = styled.li`
  list-style: none;
  color: white;
  a {
    color: white;
  }
  margin: 1rem 0;

  @media (min-width: 768px) {
    &:first-child {
      margin-top: 0;
    }
  }
`

const NewsLetterForm = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`
const NewsLetterFormTitle = styled.span`
  text-transform: uppercase;
  color: white;
`

const Input = styled.input`
  margin-top: 1rem;
  width: 200px;
  height: 38px;
  background-color: transparent;
  color: white;
  border: solid 2px white;
`

export default function Footer() {
  const data = useStaticQuery(graphql`
    query Footer {
      site {
        siteMetadata {
          title
        }
      }
      footer: wpMenu(id: { eq: "dGVybToyNzM=" }) {
        id
        footerContent {
          indirizzo
          telefono
          fax
          email
          infoAzienda
        }
      }
    }
  `)

  const { footerContent } = data.footer

  const date = new Date()

  const year = date.getFullYear()

  return (
    <Wrapper>
      <Container>
        <Left>
          <Logo />

          <Menu>
            <MenuItem>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link to="#">News</Link>
            </MenuItem>
            <MenuItem>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link to="/privacy-policy">Privacy</Link>
            </MenuItem>
            <MenuItem>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link to="/cookies">Cookie</Link>
            </MenuItem>
            <MenuItem>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link to="/normative">Normative</Link>
            </MenuItem>
          </Menu>
        </Left>

        <Center>
          <Contacts>
            <ContactInfo>{footerContent.indirizzo}</ContactInfo>

            <ContactInfo>
              <a href={`tel:${footerContent.telefono}`}>
                Tel {footerContent.telefono}
              </a>
            </ContactInfo>
            <ContactInfo>Fax {footerContent.fax}</ContactInfo>
            <ContactInfo>
              <a href={`mailto:${footerContent.email}`}>
                Mail {footerContent.email}
              </a>
            </ContactInfo>
          </Contacts>
        </Center>

        <Right>
          <NewsLetterForm>
            <NewsLetterFormTitle>Iscriviti alla newsletter</NewsLetterFormTitle>
            <Input />
          </NewsLetterForm>
        </Right>
      </Container>
      <Bottom>
        ©{data.site.siteMetadata.title} {year} | {footerContent.infoAzienda}
      </Bottom>
    </Wrapper>
  )
}
