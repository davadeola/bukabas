import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

const Home=()=>(
    <Layout>
        <div className="landing container-fluid">
          <div className="row">
            <div className="col-md-4"><img src="/static/images/person.png" id="person" className="home-img"/></div>
            <div className="col-md-4">  <h1 className="display-4">Transforming public transport</h1>
              <div className='btn-row'>

                <Link href='/signup'>
                  <a title='Login page'><button className="btn">Get started today</button></a>
                </Link>
              </div></div>
            <div className="col-md-4">  <img src="/static/images/lady.png" id="lady" className="home-img"/></div>
          </div>
        </div>

        

    </Layout>
    );


export default Home
