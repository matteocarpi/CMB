import React, { useContext } from 'react'
import { Link, navigate } from 'gatsby'
import queryString from 'query-string'
import styled, { css, ThemeContext } from 'styled-components'
import Sel, { components } from 'react-select'

import { makeSlug } from '../../utils'
import Burger from '../../assets/icons/burger-small.svg'

const Container = styled.section`
  padding-top: 6rem;
`

const Title = styled.h5`
  margin: 0 2rem;
  text-transform: none;
  @media (min-width: 768px) {
    margin-left: 2rem;
  }
`

const Navigation = styled.ul`
  display: none;
  margin: 0 2rem 2rem 2rem;

  @media (min-width: 768px) {
    display: block;
    margin-top: 0;
    padding-top: 0;
  }
`

const NavItem = styled.li`
  padding-left: 0.7rem;
  margin-left: -0.7rem;
  margin-bottom: 1rem;
  ${({ active }) =>
    active &&
    css`
      margin-left: calc(-1px - 0.7rem);
      border-left: solid 1px ${({ theme }) => theme.gold};
    `}

  &:hover {
    margin-left: calc(-1px - 0.7rem);
    border-left: solid 1px ${({ theme }) => theme.gold};
  }
`

const StyledLink = styled(Link)`
  font-size: 20px;
  font-weight: 300;
  padding: 0;
`

const SottoServizi = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  @media (min-width: 768px) {
    flex-direction: row;
    margin-top: 2rem;
  }
`

const Sidebar = styled.section`
  position: -webkit-sticky;
  position: sticky;
  background-color: white;
  width: 100%;
  padding: 2rem 0;
  top: 60px;
  @media (min-width: 768px) {
    top: 100px;
    width: 40%;
    padding: 0;
  }
`

const Select = styled(Sel)`
  width: 90%;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: none;
  }
`

const Content = styled.div`
  background-color: ${({ theme }) => theme.navy};
  padding: 2rem;
  * {
    color: white;
  }

  @media (min-width: 768px) {
    width: 60%;
  }
`

const Cut = styled.div`
  position: relative;
  overflow: visible;
  &:before {
    content: '';
    z-index: 1;
    width: 50px;
    height: 50px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: rotate(-45deg) translate(-82px, 0px);
  }

  @media (min-width: 768px) {
    &:before {
      content: '';
      z-index: 1;
      width: 50px;
      height: 50px;
      background-color: white;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: scale(2) rotate(-45deg) translate(-41px, 0px);
    }
  }
`
const Description = styled.article``

const ValueWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const ValueContainer = ({ children, ...props }) => (
  <components.ValueContainer {...props}>
    <ValueWrapper>
      <Burger />
      {children}
    </ValueWrapper>
  </components.ValueContainer>
)

const selectStyles = {
  control: provided => ({
    ...provided,
    borderWidth: '0',
    boxShadow: 'none',
  }),
  valueContainer: base => ({
    ...base,
    display: 'flex',
  }),
  placeholder: () => ({
    position: 'relative',
    marginLeft: '0.5rem',
  }),
  singleValue: () => ({
    position: 'relative',
    marginLeft: '0.5rem',
  }),
}

function ThirdLevelServices({ sottoServizi, location }) {
  const globalTheme = useContext(ThemeContext)

  const queryObj = queryString.parse(location.search)

  const { titolo, listaSottoServizi } = sottoServizi

  const sottoServiziList = {}

  listaSottoServizi.forEach(servizio => {
    const slug = makeSlug(servizio.titolo)

    sottoServiziList[`${slug}`] = servizio.descrizione
  })

  const description = sottoServiziList[queryObj.article] ?? null

  const articleParam = '?article'

  const sottoServiziOptions = listaSottoServizi.map((s, index) => {
    const slug = makeSlug(s.titolo)
    const value = `${articleParam}=${slug}&index=${index}#sottoservizio`
    return {
      value,
      label: s.titolo,
    }
  })

  return (
    <Container id="sottoservizio">
      <Title>{titolo}</Title>

      <SottoServizi>
        <Sidebar>
          <Select
            styles={selectStyles}
            options={sottoServiziOptions}
            defaultValue={0}
            onChange={({ value }) => navigate(value)}
            components={{ ValueContainer }}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: globalTheme.gold,
              },
            })}
            placeholder={sottoServiziOptions[queryObj.index].label}
          />
          <Navigation>
            {listaSottoServizi.map((sottoServizio, index) => {
              const sS = sottoServizio
              const slug = makeSlug(sS.titolo)
              return (
                <NavItem
                  active={Number(queryObj.index) === index}
                  key={sS.titolo}
                >
                  <StyledLink
                    to={`${articleParam}=${slug}&index=${index}#sottoservizio`}
                  >
                    {sS.titolo}
                  </StyledLink>
                </NavItem>
              )
            })}
          </Navigation>
        </Sidebar>

        {description && (
          <Content>
            <Description dangerouslySetInnerHTML={{ __html: description }} />
            <Cut />
          </Content>
        )}
      </SottoServizi>
    </Container>
  )
}

export default ThirdLevelServices
