import React, { useState } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.section`
  margin-top: 2rem;
`

const Title = styled.h5`
  margin-left: 2rem;
`

const Navigation = styled.ul`
  margin: 0 2rem 2rem 2rem;
`

const NavItem = styled.li`
  ${({ active }) =>
    active &&
    css`
      border-left: solid 1px ${({ theme }) => theme.gold};
    `}

  &:hover {
    border-left: solid 1px ${({ theme }) => theme.gold};
  }
`

const Button = styled.button`
  font-size: 25px;
`

const SottoServizi = styled.section`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Left = styled.section`
  width: 40%;
`

const Right = styled.section`
  background-color: ${({ theme }) => theme.navy};
  * {
    color: white;
  }
  width: 60%;
  padding: 2rem;
  max-height: 60vh;
  overflow: scroll;
  &:before {
    content: '';
    z-index: 1;
    width: 50px;
    height: 50px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: scale(2) rotate(-45deg) translate(-17.5px, 0px);
  }
`

const Description = styled.article``

export default function ThirdLevelServices({ sottoServizi, setCollapsed }) {
  const [currentSs, setCurrentSs] = useState()

  const { titolo, listaSottoServizi } = sottoServizi

  const description = listaSottoServizi[currentSs]?.descrizione ?? null

  return (
    <Container>
      <Title>{titolo}</Title>

      <SottoServizi>
        <Left>
          <Navigation>
            {listaSottoServizi.map((sottoServizio, index) => {
              const sS = sottoServizio
              return (
                <NavItem active={currentSs === index} key={sS.titolo}>
                  <Button
                    type="button"
                    onClick={() => {
                      setCurrentSs(index)
                      setCollapsed(true)
                    }}
                  >
                    {sS.titolo}
                  </Button>
                </NavItem>
              )
            })}
          </Navigation>
        </Left>

        {description && (
          <Right>
            <Description dangerouslySetInnerHTML={{ __html: description }} />
          </Right>
        )}
      </SottoServizi>
    </Container>
  )
}
