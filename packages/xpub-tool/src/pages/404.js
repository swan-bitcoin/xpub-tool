import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Uh-Oh</h1>
    <p>
      We&apos;re out of things to show you here... but we&apos;re not out of
      sats, yet!
    </p>
  </Layout>
)

export default NotFoundPage
