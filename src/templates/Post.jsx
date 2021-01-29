import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import ImageCut from '../components/ImageCut'
import PostThumb from '../components/PostThumb'

const Wrapper = styled.section`
  margin: 5rem auto;
  max-width: 1200px;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
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
  margin: 1rem;
`

const RelatedPosts = styled.section`
  display: flex;
`

const Post = ({ data }) => {
  const post = data.wpPost

  const relatedPosts =
    data.articoliCorrelati.edges.length > 0
      ? data.articoliCorrelati.edges
      : data.altriArticoli.edges

  return (
    <Layout>
      <Seo title={post.title} />
      <Header>
        <SectionTitle long>{post.title}</SectionTitle>
        <BreadCrumb to="/news">{`< Torna alle news`}</BreadCrumb>
      </Header>
      <Wrapper>
        {post.featuredImage && (
          <Image
            fluid={{
              ...post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
              aspectRatio: 4 / 3,
            }}
            dr
          />
        )}
        <Content dangerouslySetInnerHTML={{ __html: post.content }} />
      </Wrapper>

      <SectionTitle>Articoli Correlati</SectionTitle>
      <RelatedPosts>
        {relatedPosts.map(relatedPost => {
          const image =
            relatedPost.node.featuredImage?.node.localFile.childImageSharp
              .fluid ?? data.placeholderImage.fluid
          return (
            <PostThumb
              key={relatedPost.node.id}
              uri={relatedPost.node.slug}
              image={{ ...image, aspectRatio: 1 }}
              title={relatedPost.node.title}
            />
          )
        })}
      </RelatedPosts>
    </Layout>
  )
}

export default Post

export const data = graphql`
  query Post($category: String = "", $id: String = "") {
    wpPost(id: { eq: $id }) {
      id
      title
      content
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    articoliCorrelati: allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { id: { eq: $category } } } }
        id: { ne: $id }
      }
      limit: 4
    ) {
      edges {
        node {
          id
          title
          slug
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
    altriArticoli: allWpPost(filter: { id: { ne: $id } }, limit: 4) {
      edges {
        node {
          id
          title
          slug
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 400) {
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
`
