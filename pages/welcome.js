import React from 'react'
import withAuth from '../lib/helpers/withAuth'
import Layout from '../components/Layout'
import router from 'next/router'
import Link from 'next/link'
import Loadscreen from '../components/loadingScreen'


const Welcome=(props)=>(
  <Layout>
  <div className="text-center">
    <img src={props.profImg || "/static/images/account.png"} className="account-img"/>
    <h1>Welcome. You are signed in as {props.userName}</h1>

{props.userName &&
    <button className="btn btn-success" onClick={()=>{
      const newRoute="/".concat(props.userType);
      router.push(newRoute);
    }}>Continue</button>
}



  </div>
  </Layout>
)

export default withAuth(Welcome)
