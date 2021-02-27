import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
  query SiteAuthorQuery {
    site {
      siteMetadata {
        author
      }
    }
  }
`)

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to my new Blog.</p>
      <p>Written by <strong>{data.site.siteMetadata?.author || `Author`}</strong>.</p>
      <Link to="/blog/">Visit Blog</Link> <br />
    </Layout>
  )
}

export default IndexPage
