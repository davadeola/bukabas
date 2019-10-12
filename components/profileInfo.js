import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from './nav'


const ProfileInfo = (props) => (

  <div className="profile-layout">
    <div className="container-fluid text-center account-tab">
      <div className="row ">
        <div className="col-md-12">
          <img src={props.profImg || "/static/images/account.png"} className="account-img"/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h1 className="font-weight-bold">{props.userName}</h1>
        </div>
      </div>

    </div>
  </div>
)

export default ProfileInfo
