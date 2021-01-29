import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PostThumb from '../components/PostThumb'
import SectionTitle from '../components/SectionTitle'

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const Post = styled(PostThumb)`
  min-width: 20%;
  max-width: 20%;
  max-width: 300px;
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
    }
  `)

  return (
    <Layout>
      <Seo title="News" />
      <SectionTitle>News</SectionTitle>

      <Container>
        {data.allWpPost.edges.map(news => {
          const image =
            news.node.featuredImage?.node.localFile.childImageSharp.fluid ??
            data.placeholderImage.fluid
          return (
            <Post
              key={news.node.id}
              title={news.node.title}
              image={image}
              uri={`${news.node.slug}`}
            />
          )
        })}
      </Container>
    </Layout>
  )
}

export default News
