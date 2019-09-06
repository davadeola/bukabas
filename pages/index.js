import React from 'react'
import Link from 'next/link'

import Nav from '../components/nav'

const Home = () => (<div>


  <Nav/>
  <div className="landing container">
    <h1 className="display-4">Transforming public transport</h1>
    <div className='btn-row'>
      <Link href='/login'>
        <a title='Login page'><button className="btn">Login</button></a>
      </Link>
      <Link href='/signup'>
        <a title='Login page'><button className="btn">Sign up</button></a>
      </Link>
    </div>
  </div>
</div>)

export default Home
