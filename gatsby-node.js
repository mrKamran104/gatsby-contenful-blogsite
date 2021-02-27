const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const response = await graphql(`
    query {
      allContentfulPost {
        edges {
          node {
            slug
            title
          }
        }
      }
    }
  `)

    const posts = await response.data.allContentfulPost.edges

    posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        createPage({
            path: `/blog/${post.node.slug}`,
            component: path.resolve("./src/templates/blog-post.tsx"),
            context: {
                slug: post.node.slug,
                previous,
                next,
            },
        })
    })
}