import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import About from '../components/About'
import {auth, firebase} from '../lib/firebase'

const Home=()=>(
    <Layout>
        <div className="landing container-fluid">
          <div className="row">
            <div className="col-md-4"><img src="/static/images/person.png" id="person" className="home-img"/></div>
            <div className="col-md-4">  <h1 className="display-4">Transforming public transport</h1>
              <div className='btn-row'>

                <Link href='/signup' onClick={()=>{
                  auth.onAuthStateChanged(authUser => {
                    if (authUser) {
                      alert("Please sign out to register new account");
                      router.push('/');
                    }
                  });
                }}>
                  <a title='Login page'><button className="btn">Get started today</button></a>
                </Link>
              </div></div>
            <div className="col-md-4">  <img src="/static/images/lady.png" id="lady" className="home-img"/></div>
          </div>
        </div>

      <About/>


    </Layout>
    );


export default Home
