import React, { useState, useMemo, useEffect } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'
import ReactSelect from 'react-select'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PostThumb from '../components/PostThumb'
import SectionTitle from '../components/SectionTitle'
import Checkbox from '../components/Checkbox'

const Container = styled.section`
  display: flex;
  margin-top: 2rem;
  align-items: flex-start;
  @media (max-width: 817px) {
    flex-direction: column;
  }
`

const SideBar = styled.section`
  top: 60px;
  position: -webkit-sticky;
  position: sticky;
  padding: 30px;
  width: 30%;
  @media (max-width: 817px) {
    display: none;
  }
`

const TopBar = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 70px;
  z-index: 20;
  background-color: white;
  width: 100%;
  @media (min-width: 817px) {
    display: none;
  }
`

const Select = styled(ReactSelect)`
  margin: 1rem;
`

const Filter = styled.div`
  display: flex;
  flex-direction: column;
`

const FilterTitle = styled.span`
  font-size: 18px;
`

const NewsList = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 817px) {
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
  }
`

const Post = styled(PostThumb)`
  min-width: 18%;
  max-width: 18%;
  max-width: 280px;
`

const Empty = styled.h4`
  margin: 2rem auto;
`

const SearchBox = styled.input`
  height: 30px;
  width: 200px;
  border: solid 1px ${({ theme }) => theme.gold};
  padding-left: 1rem;
  margin-bottom: 1rem;
`

const News = ({ data }) => {
  const sortedCategories = data.categories.edges.sort(
    (a, b) => a.node.categoryContent.order - b.node.categoryContent.order,
  )

  const categories = sortedCategories.filter(
    category => category.node.name !== 'Uncategorised',
  )

  const allNews = useMemo(
    () =>
      data.allWpPost.edges.map(post => {
        const categoryNames = post.node.categories.nodes.map(
          category => category.name,
        )

        return { ...post.node, categories: categoryNames }
      }),
    [data],
  )

  const [news, setNews] = useState([])

  const newsPerPage = 10

  const allCategories = useMemo(() => categories, [categories])

  const categoryOptions = useMemo(
    () =>
      allCategories.map(category => ({
        label: category.node.name,
        value: category.node.name,
      })),
    [allCategories],
  )

  const allYears = useMemo(() => data.years.edges.map(y => y.node.date), [data])

  const currentYear = new Date().getFullYear()

  const lastYears = allYears.filter(year => year > currentYear - 3)

  const uniqueYears = useMemo(() => new Set(lastYears), [lastYears])

  const yearsOptions = useMemo(
    () => [...uniqueYears].map(year => ({ label: year, value: year })),
    [uniqueYears],
  )

  const [categoryFilter, setCategoryFilter] = useState([])
  const [yearsFilter, setYearsFilter] = useState([])
  const [searchKey, setSearchKey] = useState()

  useEffect(() => {
    handleFetch(newsPerPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter])

  function handleFetch(limit) {
    setNews(allNews.slice(0, limit))
  }

  const categorySet = useMemo(() => new Set(categoryFilter), [categoryFilter])

  const categoryFilteredNews = useMemo(() => {
    if (categoryFilter.length > 0) {
      return news.filter(post => post.categories.some(c => categorySet.has(c)))
    }
    return news
  }, [categoryFilter, categorySet, news])

  const yearFilteredNews = useMemo(() => {
    if (yearsFilter.length > 0) {
      return categoryFilteredNews.filter(post =>
        yearsFilter.includes(post.date),
      )
    }
    return categoryFilteredNews
  }, [yearsFilter, categoryFilteredNews])

  const filteredNews = searchKey
    ? yearFilteredNews.filter(post =>
        post.title.toLowerCase().includes(searchKey.toLowerCase()),
      )
    : yearFilteredNews

  const handleSelect = (value, setter) => {
    if (value && value.length > 0) {
      setter(value.map(v => v.value))
    } else {
      setter([])
    }
  }

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
      backgroundColor: state.isSelected ? '#dab25b' : 'rgba(13, 18, 46, 1)',
    }),
  }

  return (
    <Layout>
      <Seo title="News" uri="/news" />
      <SectionTitle main>News</SectionTitle>

      <Container>
        <TopBar>
          <Select
            styles={selectStyles}
            isMulti
            options={categoryOptions}
            placeholder="Seleziona le categorie..."
            onChange={value => handleSelect(value, setCategoryFilter)}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'rgba(13, 18, 46, 1)',
                primary25: 'rgba(13, 18, 46, 1)',
              },
            })}
          />
          <Select
            styles={selectStyles}
            isMulti
            options={yearsOptions}
            placeholder="Seleziona le date..."
            onChange={value => handleSelect(value, setYearsFilter)}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'rgba(13, 18, 46, 1)',
                primary25: 'rgba(13, 18, 46, 1)',
              },
            })}
          />
        </TopBar>
        <SideBar key="sidebar">
          <SearchBox
            onChange={e => setSearchKey(e.target.value)}
            placeholder="Cerca..."
          />
          <Filter>
            <FilterTitle>Categoria</FilterTitle>
            {allCategories.map(category => (
              <Checkbox
                key={category.node.id}
                list={categoryFilter}
                setList={setCategoryFilter}
                name={category.node.name}
              />
            ))}
          </Filter>
          <Filter>
            <FilterTitle>Data</FilterTitle>
            {[...uniqueYears].map(y => (
              <Checkbox
                key={y}
                list={yearsFilter}
                setList={setYearsFilter}
                name={y}
              />
            ))}
          </Filter>
        </SideBar>
        <InfiniteScroll
          key="infinite-scroll"
          pageStart={0}
          loadMore={() => handleFetch(news.length + newsPerPage)}
          hasMore={news.length < allNews.length}
          loader={<div>Loading...</div>}
        >
          <NewsList key="porcoddio">
            {filteredNews.map(post => {
              const image =
                post.featuredImage?.node.localFile.childImageSharp?.fluid ??
                data.placeholderImage.fluid
              return (
                <Post
                  key={post.id}
                  title={post.title}
                  image={image}
                  uri={`${post.slug}`}
                />
              )
            })}
            {filteredNews.length < 1 && (
              <Empty>Nessun articolo trovato...</Empty>
            )}
          </NewsList>
        </InfiniteScroll>
      </Container>
    </Layout>
  )
}

export default News

export const data = graphql`
  query News {
    allWpPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          id
          title
          slug
          date(formatString: "Y")
          categories {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
    placeholderImage: imageSharp(
      fluid: { originalName: { eq: "placeholder-image.png" } }
    ) {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
    categories: allWpCategory(
      sort: {
        fields: wpChildren___nodes___categoryContent___order
        order: DESC
      }
    ) {
      edges {
        node {
          id
          name
          categoryContent {
            order
          }
        }
      }
    }
    years: allWpPost {
      edges {
        node {
          date(formatString: "Y")
        }
      }
    }
  }
`
