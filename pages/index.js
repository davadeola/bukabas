import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'

const Home = () => (<div>
  <Head>
    <title>Home</title>
    <link rel="stylesheet" href="/static/bootstrap.min.css" key="test"/>
    <link rel="stylesheet" href="/static/main.css" key="css1"/>
  </Head>

  <Nav/>
  <div className="landing container">
    <h1 className="display-4">transforming public transport</h1>
    <div className='btn-row'>
      <Link href='/login'>
        <a title='Login page'><button className="btn">Login</button></a>
      </Link>
      <button className="btn">Sign up</button>
    </div>
  </div>
</div>)

export default Home
