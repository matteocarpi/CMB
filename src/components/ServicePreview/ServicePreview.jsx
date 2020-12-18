import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'

import SectionTitle from '../SectionTitle'
import IconPlus from '../../assets/icons/plus.svg'

const Container = styled.div`
  margin: 4rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ButtonWrap = styled.div`
  position: relative;
  ${({ active }) =>
    active &&
    css`
      &:before {
        content: '';
        height: 20px;
        width: 30px;
        border-left: solid 2px ${({ theme }) => theme.gold};
        position: absolute;
        left: -8px;
        top: 8px;
      }
    `}

  &:hover {
    &:before {
      content: '';
      height: 20px;
      width: 30px;
      border-left: solid 2px ${({ theme }) => theme.gold};
      position: absolute;
      left: -8px;
      top: 8px;
    }
  }
`

const Button = styled.button`
  background-color: white;
  cursor: pointer;
  border: none;
  box-shadow: none;
  text-align: left;
  padding: 0.3rem 0;
  font-size: 18px;
  font-weight: 200;
  transform-origin: center left;
  transition-duration: 0.5s;
`

const Menu = styled.div`
  margin: 1rem 0;
  padding-left: 1rem;
  align-self: flex-start;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`

const Preview = styled.div`
  background-color: ${({ theme }) => theme.navy};
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  position: relative;
  &:after {
    content: '';
    width: 50px;
    height: 50px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: rotate(45deg) translate(0px, 35px);
  }
`

const Content = styled.div`
  color: white;
  border-left: solid 1px ${({ theme }) => theme.gold};

  p {
    margin: 0;
    padding-left: 1rem;
  }
  * {
    color: white;
  }
`
const StyledLink = styled(Link)`
  width: min-content;
  align-self: flex-end;
`
const Plus = styled(IconPlus)`
  &:hover {
    path {
      fill: ${({ theme }) => theme.gold};
    }
  }
  align-self: flex-end;
  margin-top: 3rem;
`
export default function ServicePreview() {
  const [currentService, setCurrentService] = useState(null)

  const data = useStaticQuery(graphql`
    {
      wpPage(id: { eq: "cG9zdDoxOTgwMg==" }) {
        title
        serviziContent {
          descrizione
          consulenza {
            descrizione
            titolo
          }
          formazione {
            descrizione
            titolo
          }
          vigilanza {
            descrizione
            titolo
          }
        }
      }
    }
  `)

  const { serviziContent } = data.wpPage
  const { consulenza } = serviziContent
  const { formazione } = serviziContent
  const { vigilanza } = serviziContent

  const servizi = [consulenza, formazione, vigilanza]

  const description =
    servizi[currentService]?.descrizione ?? serviziContent.descrizione

  return (
    <Container>
      <SectionTitle onClick={() => setCurrentService(null)}>
        {data.wpPage.title}
      </SectionTitle>
      <Menu>
        {servizi.map((service, index) => (
          <ButtonWrap key={service.titolo} active={index === currentService}>
            <Button onClick={() => setCurrentService(index)}>
              {service.titolo}
            </Button>
          </ButtonWrap>
        ))}
      </Menu>

      <Preview>
        <Content
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <StyledLink to="#">
          <Plus />
        </StyledLink>
      </Preview>
    </Container>
  )
}
