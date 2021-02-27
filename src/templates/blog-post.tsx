import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export const query = graphql`
  query($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      author
      image {
        fluid(maxWidth: 200, maxHeight: 200) {
          src
        }
      }
      content {
        raw
      }
      createdAt(formatString: "DD MMMM, YYYY, hh:mm a")
      updatedAt(formatString: "DD MMMM, YYYY, hh:mm a")
    }
  }
`

const BlogPost = (props: {
  data: {
    contentfulPost: {
      image: { fluid: { src: string } }
      title: string
      createdAt: string
      content: { raw: string }
      updatedAt: string
      author: string
    }
  }
  pageContext: {
    previous: { title: string; slug: string }
    next: { title: string; slug: string }
  }
}) => {
  const post = props.data.contentfulPost
  // console.log(props)
  const { previous, next } = props.pageContext

  return (
    <Layout>
      <SEO title={post.title} />
      <Link to="/blog/">Visit the Blog Page</Link>
      <div className="content" style={{ marginTop: "30px" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            {post.image && (
              <img
                className="featured"
                src={post.image.fluid.src}
                alt={post.title}
              />
            )}
          </div>
          <div style={{ paddingLeft: "10px" }}>
            <div
              style={{
                marginBottom: "10px",
                fontSize: "35px",
                fontWeight: "bold",
                lineHeight: "35px",
                textAlign: "justify",
              }}
            >
              {post.title}
            </div>
            <p style={{ fontSize: "15px" }}>
              Posted on: <span>{post.createdAt}</span>
              {post.updatedAt !== post.createdAt && (
                <>
                  {" "}
                  - Updated on: <span>{post.updatedAt}</span>
                </>
              )}{" "}
              - Author: <span>{post.author}</span>
            </p>
          </div>
        </div>
        {documentToReactComponents(JSON.parse(post.content.raw))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "120px",
        }}
      >
        <div>
          {previous && (
            <Link to={`/blog/${previous.slug}`} rel="prev">
              &#8592; {previous.title}
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link to={`/blog/${next.slug}`} rel="next">
              {next.title} &#8594;
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
