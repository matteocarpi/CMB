import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import SectionTitle from '../SectionTitle'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ButtonWrap = styled.div`
  padding-left: 0.3rem;
  z-index: 1;
  border-left: solid 1px white;
  &:hover {
    border-left: solid 2px ${({ theme }) => theme.gold};
  }
  ${({ active }) =>
    active &&
    css`
      border-left: solid 2px ${({ theme }) => theme.gold};
    `}
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
  &:hover {
    transform: scale(1.5);
  }
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
`

const Content = styled.div`
  color: white;
  * {
    color: white;
  }
`

export default function ServicePreview() {
  const [currentService, setCurrentService] = useState(0)

  const data = useStaticQuery(graphql`
    {
      wpPage(id: { eq: "cG9zdDoxOTgwMg==" }) {
        title
        serviziContent {
          consulenza {
            descrizione
            titolo
          }
          formazione {
            descrizione
            titolo
          }
          formazioneFinanziaria {
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

  const servizi = Object.entries(data.wpPage.serviziContent).map(e => ({
    ...e[1],
  }))

  return (
    <Container>
      <SectionTitle>{data.wpPage.title}</SectionTitle>
      <Menu>
        {servizi.map((service, index) => (
          <ButtonWrap active={index === currentService}>
            <Button
              key={service.title}
              onClick={() => setCurrentService(index)}
            >
              {service.titolo}
            </Button>
          </ButtonWrap>
        ))}
      </Menu>

      <Preview>
        <Content
          dangerouslySetInnerHTML={{
            __html: servizi[currentService].descrizione,
          }}
        />
      </Preview>
    </Container>
  )
}
