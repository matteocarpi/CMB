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
            descrizione
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
            descrizione
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
            descrizione
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
      allWpServizio {
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
    }
  `)

  const { consulenza } = data.wpPage.serviziContent
  const { formazione } = data.wpPage.serviziContent
  const { vigilanza } = data.wpPage.serviziContent

  const primaryServices = [consulenza, formazione, vigilanza]
  const { sottotitolo } = data.wpPage.serviziContent

  primaryServices.forEach(service => {
    const slug = `/servizi/${service.titolo.toLowerCase()}`
    const { titolo } = service
    const category = titolo.toLowerCase()

    const serviceData = data.wpPage.serviziContent[titolo.toLowerCase()]

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
}
