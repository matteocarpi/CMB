import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SimplePage from '../components/SimplePage'

const Cookies = () => {
  const data = useStaticQuery(graphql`
    query Cookies {
      cookies: wpPage(id: { eq: "cG9zdDoyMDkzMg==" }) {
        id
        title
        cookiesContent {
          contenuto
        }
      }
    }
  `)

  const { title } = data.cookies
  const content = data.cookies.cookiesContent.contenuto

  return (
    <Layout>
      <Seo title={title} />
      <SimplePage title={title} content={content} />
    </Layout>
  )
}

export default Cookies
