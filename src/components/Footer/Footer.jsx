import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import LogoSVG from '../../assets/logo/logo-full-light.svg'

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  background-color: ${({ theme }) => theme.navy};

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

const Logo = styled(LogoSVG)`
  margin-bottom: 1rem;
`
const Menu = styled.ul``

const MenuItem = styled.li`
  margin: 1rem 0;
  a {
    color: white;
  }
`
const Contacts = styled.ul`
  margin-top: 2rem;
  @media (min-width: 768px) {
    margin-top: 0;
  }
`

const ContactInfo = styled.li`
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
  return (
    <Container>
      <Left>
        <Logo />

        <Menu>
          <MenuItem>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to="#">Privacy</Link>
          </MenuItem>
          <MenuItem>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to="#">Cookie</Link>
          </MenuItem>
          <MenuItem>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to="#">Normative</Link>
          </MenuItem>
        </Menu>
      </Left>

      <Center>
        <Contacts>
          <ContactInfo>Piazzale Cardinal Consalvi 9, Roma</ContactInfo>

          <ContactInfo>
            <a href="tel:+390636003897">Tel +39.06.3600.3897</a>
          </ContactInfo>
          <ContactInfo>
            <a href="tel:+390689280816">Fax +39.06.8928.0816</a>
          </ContactInfo>
          <ContactInfo>
            <a href="mailto:comunicazione@gruppocmb.it">
              Mail comunicazione@gruppocmb.it
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
  )
}
