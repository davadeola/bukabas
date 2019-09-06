import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'


const Login = () => (
  <div>
    <Head>
      <title>Login</title>
      <link rel="stylesheet" href="/static/bootstrap.min.css" rel="stylesheet" key="test"/>
      <link rel="stylesheet" href="/static/main.css" rel="stylesheet" key="css1"/>
    </Head>

    <Nav />
    
  </div>
)

export default Login
