import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

const News = () => {
  const data = useStaticQuery(graphql`
    query News {
      allWpPost {
        edges {
          node {
            id
            title
            slug
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Seo title="News" />
      <h1>News</h1>

      <ul>
        {data.allWpPost.edges.map(news => (
          <li key={news.node.id}>
            <Link to={`/${news.node.slug}`}>{news.node.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default News
