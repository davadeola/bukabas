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

                <Link href='/signup'>
                  <a title='Sign up page'><button className="btn" onClick={()=>{
                    auth.onAuthStateChanged(authUser => {
                      if (authUser) {
                        alert("Please sign out to register new account");
                        location.reload(false);
                      }
                    });
                  }}>Get started today</button></a>
                </Link>
              </div></div>
            <div className="col-md-4">  <img src="/static/images/lady.png" id="lady" className="home-img"/></div>
          </div>
        </div>

      <About/>


    </Layout>
    );


export default Home
