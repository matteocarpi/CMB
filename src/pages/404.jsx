import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/Seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>Ops... La pagina che stai cercando non esiste...</p>
  </Layout>
)

export default NotFoundPage
