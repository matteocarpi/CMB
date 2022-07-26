/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

console.log('!!! -------> ', process.env.RUNNER_TYPE === 'INCREMENTAL_PREVIEWS')

module.exports = {
  siteMetadata: {
    title: 'Gruppo CMB',
    siteUrl: 'https://www.gruppocmb.com',
  },
  plugins: [
   /* {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },*/
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: process.env.FACEBOOK_PIXEL,
      },
    },
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
      resolve: 'gatsby-source-wordpress',
      options: {
        url: process.env.GRAPHQL_ENDPOINT,
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
              process.env.NODE_ENV === 'development' ||
              process.env.RUNNER_TYPE === 'INCREMENTAL_PREVIEWS'
                ? // Lets just pull 50 posts in development to make it easy on ourselves (aka. faster).
                  5
                : // and we don't actually need more than 5000 in production for this particular site
                  5000,
          },
        },
        debug: {
          preview: true,
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
    'gatsby-plugin-sass',
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-plugin-crisp-chat',
      options: {
        // websiteId: process.env.CRISP_WEBSITE_ID,
        websiteId: process.env.CRISP_WEBSITE_ID,
        enableDuringDevelop: true, // Optional. Disables Crisp Chat during gatsby develop. Defaults to true.
        defer: true, // Optional. Sets the Crisp loading script to defer instead of async. Defaults to false.
        enableImprovedAccessibility: false, // Optional. Sets aria-label attribute on pop-up icon for screen readers. Defaults to true.
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT, // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    'gatsby-plugin-gatsby-cloud',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
