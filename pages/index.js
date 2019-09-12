import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

const Home=()=>(
    <Layout>
        <div className="landing container-fluid">
          <img src="/static/images/person.png" id="person" className="home-img"/>
            <img src="/static/images/lady.png" id="lady" className="home-img"/>

          <h1 className="display-4">Transforming public transport</h1>
          <div className='btn-row'>

            <Link href='/signup'>
              <a title='Login page'><button className="btn">Get started today</button></a>
            </Link>
          </div>


        </div>

    </Layout>
    );


export default Home
