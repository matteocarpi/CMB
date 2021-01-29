import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PostThumb from '../components/PostThumb'
import SectionTitle from '../components/SectionTitle'
import Checkbox from '../components/Checkbox'

const Container = styled.section`
  position: relative;
  display: flex;
  margin-top: 2rem;
`

const SideBar = styled.section`
  padding: 30px;
  width: 20%;
  position: sticky;
  top: 150px;
`

const Filter = styled.div`
  display: flex;
  flex-direction: column;
`

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

const News = () => {
  const data = useStaticQuery(graphql`
    query News {
      allWpPost {
        edges {
          node {
            id
            title
            slug
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
    }
  `)

  const allCategories = data.categories.edges

  const [categoryFilter, setCategoryFilter] = useState([])

  const categorySet = new Set(categoryFilter)

  const news = data.allWpPost.edges.map(post => {
    const categories = post.node.categories.nodes.map(category => category.name)

    return { ...post.node, categories }
  })

  const categoryFilteredNews =
    categoryFilter.length > 0
      ? news.filter(post => post.categories.some(c => categorySet.has(c)))
      : news

  const filteredNews = [...categoryFilteredNews]

  return (
    <Layout>
      <Seo title="News" />
      <SectionTitle>News</SectionTitle>

      <Container>
        <SideBar>
          <Filter>
            {allCategories.map(category => (
              <Checkbox
                key={category.node.id}
                list={categoryFilter}
                setList={setCategoryFilter}
                name={category.node.name}
              />
            ))}
          </Filter>
        </SideBar>
        <NewsList>
          {filteredNews.map((post, index) => {
            const image =
              post.featuredImage?.node.localFile.childImageSharp.fluid ??
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
          })}
          {filteredNews.length < 1 && <Empty>Nessun articolo trovato...</Empty>}
        </NewsList>
      </Container>
    </Layout>
  )
}

export default News
