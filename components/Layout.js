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
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="icon" href="/static/images/logo.png"/>
    <link rel="manifest" href="/static/manifest.json"/>
    <meta name="theme-color" content="#34d7d7"/>
    <link rel="apple-touch-icon" href="/static/images/logo.png"/>
    <meta name="apple-mobile-web-app-title" content="Bukabas"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="mobile-web-app-capable" content="yes"/>
  </Head>

  <div className="my-landing">
    {props.children}
  </div>
  <Nav/>
</div>)

export default Layout
