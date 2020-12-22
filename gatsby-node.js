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
    }
  `)

  const { consulenza } = data.wpPage.serviziContent
  const { formazione } = data.wpPage.serviziContent
  const { vigilanza } = data.wpPage.serviziContent

  const primaryServices = [consulenza, formazione, vigilanza]

  primaryServices.forEach(service => {
    const slug = `/servizi/${service.titolo.toLowerCase()}`
    const { titolo } = service
    const { sottotitolo } = data.wpPage.serviziContent
    const serviceData = data.wpPage.serviziContent[service.titolo.toLowerCase()]
    const category = titolo.toLowerCase()

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
}
