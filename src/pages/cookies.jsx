import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SimplePage from '../components/SimplePage'

const Cookies = ({ data }) => {
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

export const data = graphql`
  query Cookies {
    cookies: wpPage(id: { eq: "cG9zdDoyMDkzMg==" }) {
      id
      title
      cookiesContent {
        contenuto
      }
    }
  }
`
