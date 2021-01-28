import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import ImageCut from '../components/ImageCut'

const Wrapper = styled.section`
  margin: 5rem auto;
  max-width: 1200px;
`

const Content = styled.article`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 30px;
  }

  h2 {
    font-size: 30px;
  }

  h3 {
    font-size: 25px;
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

const Image = styled(ImageCut)`
  margin: 0 30px 30px 30px;
  width: 40%;
  float: right;
`

const BreadCrumb = styled(Link)`
  margin-left: 16px;
`
const Post = ({ data }) => {
  const post = data.wpPost

  return (
    <Layout>
      <Seo title={post.title} />
      <SectionTitle long>{post.title}</SectionTitle>
      <br />
      <BreadCrumb to="/news">{`< Torna alle news`}</BreadCrumb>
      <Wrapper>
        {post.featuredImage && (
          <Image
            fluid={{
              ...post.featuredImage.node.localFile.childImageSharp.fluid,
              aspectRatio: 4 / 3,
            }}
            dr
          />
        )}
        <Content dangerouslySetInnerHTML={{ __html: post.content }} />
      </Wrapper>
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
