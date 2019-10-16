import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import About from '../components/About'
import {auth, firebase} from '../lib/firebase'
import TopNav from '../components/topNav'
import CallAction from '../components/callAction'

const Home=()=>(
    <Layout>

        <TopNav/>
        <div ></div>
        <div className="landing container-fluid" id="home-screen">
          <div className="row">

            <div className="col-md-12">

             <img src="/static/images/logo.png" id="person" className="home-img"/>

              <CallAction/>
            </div>

          </div>
        </div>


    </Layout>
    );


export default Home
