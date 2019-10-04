import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from './nav'


const Layout = (props) => (<div>
  <Head>
    <title>Home</title>
    <link rel="stylesheet" href="/static/bootstrap.min.css" key="test"/>
    <link rel="stylesheet" href="/static/react-toastify.css" key="css1"/>
      <link rel="stylesheet" href="/static/mapbox-gl.css" key="css3"/>
    <link rel="stylesheet" href="/static/main.css" key="css2"/>
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v0.42.0/mapbox-gl.css"/>
  </Head>
  <Nav/>
  <div className="my-landing">
  {props.children}
  </div>
</div>
)

export default Layout
