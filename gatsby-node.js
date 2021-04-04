/* eslint-disable func-names */
exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      wpPage(id: { eq: "cG9zdDoxOTgwMg==" }) {
        title
        serviziContent {
          sottotitolo
          consulenza {
            titolo
            citazione
            informazioni
            immagine {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    base64
                    aspectRatio
                    sizes
                    src
                    srcSet
                  }
                }
              }
            }
          }
          formazione {
            titolo
            citazione
            informazioni
            immagine {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    base64
                    aspectRatio
                    sizes
                    src
                    srcSet
                  }
                }
              }
            }
          }
          vigilanza {
            titolo
            citazione
            informazioni
            immagine {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    base64
                    aspectRatio
                    sizes
                    src
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
      allWpServizio(sort: { fields: servizioContent___ordine, order: ASC }) {
        edges {
          node {
            id
            servizioContent {
              categoria
            }
            slug
          }
        }
      }
      allWpPost {
        edges {
          node {
            id
            slug
            categories {
              nodes {
                id
              }
            }
          }
        }
      }
    }
  `)

  const { consulenza } = data.wpPage.serviziContent
  const { formazione } = data.wpPage.serviziContent
  const { vigilanza } = data.wpPage.serviziContent

  const primaryServices = [consulenza, formazione, vigilanza]
  const { sottotitolo } = data.wpPage.serviziContent

  primaryServices.forEach(service => {
    const isVigilanza =
      service.titolo.toLowerCase().substring(0, 9) === 'vigilanza'

    const slug = isVigilanza
      ? `/servizi/${service.titolo.toLowerCase().substring(0, 9)}`
      : `/servizi/${service.titolo.toLowerCase()}`
    const { titolo } = service
    const category = titolo.toLowerCase()

    const serviceData =
      data.wpPage.serviziContent[
        isVigilanza
          ? titolo.toLowerCase().substring(0, 9)
          : titolo.toLowerCase()
      ]

    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/PrimaryServices.jsx`),
      context: {
        titolo,
        sottotitolo,
        slug,
        primaryServices,
        serviceData,
        category,
      },
    })
  })

  const secondaryServices = data.allWpServizio.edges

  secondaryServices.forEach(service => {
    const slug = `/servizi/${service.node.servizioContent.categoria}/${service.node.slug}`
    const category = service.node.servizioContent.categoria
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/SecondaryService.jsx`),
      context: {
        id: service.node.id,
        category,
        primaryServices,
        sottotitolo,
      },
    })
  })

  const newsList = data.allWpPost.edges

  newsList.forEach(news => {
    actions.createPage({
      path: news.node.slug,
      component: require.resolve(`./src/templates/Post.jsx`),
      context: { id: news.node.id, category: news.node.categories.nodes[0].id },
    })
  })
}
