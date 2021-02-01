/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
module.exports = {
  siteMetadata: {
    title: 'Gruppo CMB',
    siteUrl: 'https://www.gruppocmb.com',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'cmb-group',
        short_name: 'cmb',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#040818',
        display: 'minimal-ui',
        icon: 'src/assets/logo/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-wordpress-experimental',
      options: {
        url: 'https://api-cmb.tametodesign.it/graphql',
        // allows a fallback url if WPGRAPHQL_URL is not set in the env, this may be a local or remote WP instance.
        schema: {
          // Prefixes all WP Types with "Wp" so "Post and allPost" become "WpPost and allWpPost".
          typePrefix: 'Wp',
        },
        develop: {
          // caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
          hardCacheMediaFiles: true,
        },
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === 'development'
                ? // Lets just pull 50 posts in development to make it easy on ourselves (aka. faster).
                  20
                : // and we don't actually need more than 5000 in production for this particular site
                  5000,
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/assets`,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts-v2',
      options: {
        fonts: [
          // Cinzel is local
          {
            family: 'Jost:ital,wght@0,200;0,300;0,400;1,200;1,300;1,400&',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Jost:ital,wght@0,200;0,300;0,400;1,200;1,300;1,400&',
          },
        ],
      },
    },
    'gatsby-plugin-sass',
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
