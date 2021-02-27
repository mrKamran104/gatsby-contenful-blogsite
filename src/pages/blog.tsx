import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Blog = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulPost(sort: { order: DESC, fields: id }) {
          edges {
            node {
              title
              id
              slug
              subtitle
              author
              image {
                fluid(maxWidth: 200, maxHeight: 200) {
                  src
                }
              }
              createdAt(formatString: "DD MMMM, YYYY, hh:mm a")
              updatedAt(formatString: "DD MMMM, YYYY, hh:mm a")
            }
          }
        }
      }
    `
  )
  return (
    <Layout>
      <SEO title="Blog" />
      <p>
        <Link to="/">Go back to the homepage</Link>
      </p>
      <div className="posts">
        {data.allContentfulPost.edges.map(
          (edge: {
            node: {
              id: string
              image: { fluid: { src: string } }
              title: string
              slug: string
              createdAt: string
              updatedAt: string
              author: string
              subtitle: string
            }
          }) => {
            return (
              <div
                className="post"
                key={edge.node.id}
                style={{ marginBottom: "20px" }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    {edge.node.image && (
                      <img
                        className="featured"
                        src={edge.node.image.fluid.src}
                        alt={edge.node.title}
                      />
                    )}
                  </div>
                  <div style={{ paddingLeft: "10px" }}>
                    <Link
                      style={{ fontWeight: "bold", fontSize: "25px" }}
                      to={`/blog/${edge.node.slug}/`}
                    >
                      {edge.node.title}
                    </Link>
                    <br />
                    <span style={{ fontSize: "10px", color: "GrayText" }}>
                      Posted on <span>{edge.node.createdAt}</span>
                      {edge.node.updatedAt !== edge.node.createdAt && (
                        <>
                          {" "}
                          - Updated on: <span>{edge.node.updatedAt}</span>
                        </>
                      )}{" "}
                      - Author: <span>{edge.node.author}</span>
                    </span>
                    <br />
                    {edge.node.subtitle}
                    <Link
                      style={{ paddingLeft: "10px" }}
                      to={`/blog/${edge.node.slug}/`}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            )
          }
        )}
      </div>
    </Layout>
  )
}

export default Blog
