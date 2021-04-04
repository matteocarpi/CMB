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

  li {
    list-style: none;
  }
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
  font-size: 20px;
  font-weight: 300;
  a {
    display: flex;
    p {
      text-transform: uppercase;
      color: ${({ theme }) => theme.gold};
      margin: 0;
      &:first-child {
        margin-right: 0.5rem;
      }
    }
  }

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
const Description = styled.article`
  @media (min-width: 768px) {
    ul {
      li {
        margin-left: 60px;
      }
    }

    ol {
      li {
        margin-left: 60px;
      }
    }
  }

  @media (max-width: 767px) {
    p {
      margin-left: 0;
      margin-right: 0;
    }
  }
`

const ValueWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const OptionComponent = styled.li`
  color: white;
  margin-left: 0.5rem;
`

const ValueContainer = ({ children, ...props }) => (
  <components.ValueContainer {...props}>
    <ValueWrapper>
      <Burger />
      {children}
    </ValueWrapper>
  </components.ValueContainer>
)
const Option = ({ children, ...props }) => (
  <components.Option {...props}>
    <OptionComponent>{children}</OptionComponent>
  </components.Option>
)

function ThirdLevelServices({ sottoServizi, location }) {
  const globalTheme = useContext(ThemeContext)

  const isBrowser = typeof window !== 'undefined'

  const queryObj = queryString.parse(location.search)

  const { titolo, listasottoservizi } = sottoServizi

  const sottoServiziList = {}

  listasottoservizi.forEach(servizio => {
    const slug = makeSlug(servizio.titolo)

    sottoServiziList[`${slug}`] = servizio.descrizione
  })

  const currentIndex = isBrowser && queryObj.index
  const description = sottoServiziList[queryObj.article] ?? null

  const articleParam = '?article'

  const sottoServiziOptions = listasottoservizi.map((s, index) => {
    const slug = makeSlug(s.titolo)
    const value = `${articleParam}=${slug}&index=${index}`
    return {
      value,
      label: s.titolo,
    }
  })

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
    option: (provided, state) => ({
      ...provided,
      color: 'white',
      padding: '1rem',
      backgroundColor: state.isSelected ? globalTheme.gold : globalTheme.navy,
    }),
  }

  return (
    <Container id="sottoservizio">
      <Title>{titolo}</Title>

      <SottoServizi>
        <Sidebar>
          {sottoServiziOptions && (
            <Select
              styles={selectStyles}
              options={sottoServiziOptions}
              defaultValue={Number(currentIndex)}
              onChange={({ value }) => navigate(`${value}#sottoservizio`)}
              components={{ ValueContainer, Option }}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: globalTheme.navy,
                  primary25: globalTheme.navy,
                },
              })}
              placeholder={sottoServiziOptions[currentIndex ?? 0]?.label}
            />
          )}

          <Navigation>
            {listasottoservizi.map((sottoServizio, index) => {
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
                    <p>• </p>
                    <p>{sS.titolo}</p>
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
