import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from './nav'


const Layout = (props) => (<div>
  <Head>
    <title>Home</title>
    <link rel="stylesheet" href="/static/bootstrap.min.css" key="test"/>
    <link rel="stylesheet" href="/static/main.css" key="css1"/>
  </Head>
  <Nav/>
  <div className="my-landing">
  {props.children}
  </div>
</div>
)

export default Layout
