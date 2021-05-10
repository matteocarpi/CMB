import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useCookies } from 'react-cookie'
import { Link } from 'gatsby'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.navy};
  width: 100%;
  padding: 1rem;
  border-top: 1px solid white;
  z-index: 1000;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const Button = styled.button`
  cursor: pointer;
  padding: 0.5rem 2rem;
  background-color: white;
  border: 2px solid white;
  margin: 0 1rem;
  border-radius: 10px;
  ${({ lighter }) =>
    lighter &&
    css`
      border: 2px solid white;
      background-color: ${({ theme }) => theme.navy};
      color: white;
    `}

  @media (max-width: 767px) {
    margin: 1rem 0;
  }
`

const Info = styled.span`
  color: white;
  font-size: 18px;
  a {
    color: white;
    text-decoration: underline;
    &:visited {
      color: white;
    }
  }
`

export default function CookiePopUp() {
  const [visited, setVisited] = useState(true)

  const analyticsCookie = 'gatsby-gdpr-google-analytics'

  const [cookies, setCookie] = useCookies([analyticsCookie, 'visited'])

  useEffect(() => {
    if (!cookies.visited) {
      setVisited(false)
    }
  }, [cookies.visited])

  const acceptCookie = value => {
    setCookie(analyticsCookie, value)
    setCookie('visited', true)
    setVisited(true)
  }

  return (
    <>
      {!visited && (
        <Container>
          <Info>
            Questo sito utilizza cookies per migliorare la tua esperienza.{' '}
            <Link to="/cookies">Cookies</Link>
            {' - '}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </Info>
          <Button type="button" onClick={() => acceptCookie(true)}>
            Accetta
          </Button>

          {/* <Button lighter type="button" onClick={() => acceptCookie(false)}>
            Rifiuta
          </Button> */}
        </Container>
      )}
    </>
  )
}
