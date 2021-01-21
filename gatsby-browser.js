/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import 'swiper/swiper-bundle.min.css'

// eslint-disable-next-line import/prefer-default-export
export const shouldUpdateScroll = ({ routerProps }) => {
  const disableScrollUpdate =
    routerProps.location.state?.disableScrollUpdate ?? null
  return !disableScrollUpdate
}
