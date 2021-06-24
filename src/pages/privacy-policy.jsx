import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SimplePage from '../components/SimplePage'

const PrivacyPolicy = ({ data }) => {
  const { title } = data.privacy
  const content = data.privacy.privacyPolicyContent.contenuto

  return (
    <Layout>
      <Seo title={title} />
      <SimplePage title={title} content={content} />
    </Layout>
  )
}

export default PrivacyPolicy

export const data = graphql`
  query PrivacyPolicy {
    privacy: wpPage(id: { eq: "cG9zdDoyMDkxOA==" }) {
      id
      title
      privacyPolicyContent {
        contenuto
      }
    }
  }
`
