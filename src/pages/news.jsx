import React, { useState, useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PostThumb from '../components/PostThumb'
import SectionTitle from '../components/SectionTitle'
import Checkbox from '../components/Checkbox'

const Container = styled.section`
  display: flex;
  margin-top: 2rem;
  align-items: flex-start;
`

const SideBar = styled.section`
  top: 60px;
  position: -webkit-sticky;
  position: sticky;
  padding: 30px;
  width: 20%;
`

const Filter = styled.div`
  display: flex;
  flex-direction: column;
`

const FilterTitle = styled.span``

const NewsList = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Post = styled(PostThumb)`
  min-width: 20%;
  max-width: 20%;
  max-width: 300px;
  &:first-child {
    min-width: 45%;
    max-width: 630px;
    max-height: 300px;
  }
`

const Empty = styled.h4`
  margin: 2rem auto;
`

const SearchBox = styled.input``

const News = () => {
  const data = useStaticQuery(graphql`
    query News {
      allWpPost {
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
        fluid: { originalName: { eq: "logo-full.png" } }
      ) {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
      categories: allWpCategory {
        edges {
          node {
            id
            name
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
  `)
  const news = useMemo(
    () =>
      data.allWpPost.edges.map(post => {
        const categories = post.node.categories.nodes.map(
          category => category.name,
        )

        return { ...post.node, categories }
      }),
    [data],
  )

  const allCategories = useMemo(() => data.categories.edges, [data])

  const allYears = useMemo(() => data.years.edges.map(y => y.node.date), [data])

  const uniqueYears = useMemo(() => new Set(allYears), [allYears])

  const [categoryFilter, setCategoryFilter] = useState([])
  const [yearsFilter, setYearsFilter] = useState([])
  const [searchKey, setSearchKey] = useState()

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

  return (
    <Layout>
      <Seo title="News" />
      <SectionTitle>News</SectionTitle>

      <Container>
        <SideBar>
          <SearchBox onChange={e => setSearchKey(e.target.value)} />
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
        <NewsList>
          {useMemo(
            () =>
              filteredNews.map((post, index) => {
                const image =
                  post.featuredImage?.node.localFile.childImageSharp?.fluid ??
                  data.placeholderImage.fluid
                return (
                  <Post
                    key={post.id}
                    title={post.title}
                    image={image}
                    uri={`${post.slug}`}
                    original={index === 0}
                    large={index === 0}
                  />
                )
              }),
            [data.placeholderImage.fluid, filteredNews],
          )}
          {filteredNews.length < 1 && <Empty>Nessun articolo trovato...</Empty>}
        </NewsList>
      </Container>
    </Layout>
  )
}

export default News
