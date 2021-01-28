import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'

const Content = styled.article`
  margin: 5rem auto;
  max-width: 1400px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 30px;
  }
  div {
    margin: 30px;
  }

  a {
    border-bottom: solid 1px ${({ theme }) => theme.gold};
  }

  p,
  div {
    text-align: justify;
  }
`

const Post = ({ data }) => {
  const post = data.wpPost

  return (
    <Layout>
      <Seo title={post.title} />
      <SectionTitle long>{post.title}</SectionTitle>
      <Content dangerouslySetInnerHTML={{ __html: post.content }} />
    </Layout>
  )
}

export default Post

export const data = graphql`
  query Post($id: String = "") {
    wpPost(id: { eq: $id }) {
      id
      title
      content
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
`
