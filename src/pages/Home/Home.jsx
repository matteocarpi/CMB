import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../../components/layout';
import SEO from '../../components/seo';

const Home = () => {
  const data = useStaticQuery(graphql`
{
  wpPage(id: {eq: "cG9zdDo5"}) {
    id
    title
    content
  }
}
  `);

  return (
    <Layout>
      <SEO title="Home" />
      <h1>{data.wpPage.title}</h1>
      <div
      // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: data.wpPage.content }}
      />
    </Layout>
  );
};

export default Home;
