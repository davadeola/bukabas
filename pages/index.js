import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

const Home=()=>(
    <Layout>
        <div className="landing container">
          <h1 className="display-4">Transforming public transport</h1>
          <div className='btn-row'>
            
            <Link href='/signup'>
              <a title='Login page'><button className="btn">Sign up</button></a>
            </Link>
          </div>
        </div>
    </Layout>
    );


export default Home
