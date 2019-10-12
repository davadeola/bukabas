import React from 'react'


const Overview=(props)=>(
  <div className="text-center">
    <img src={props.profImg || "/static/images/account.png"} className="account-img"/>
    <h1>Welcome to your Dashboard.</h1>
    <p>Select an option to begin exploring as a <b> {props.userType}</b></p>
    <p>Email: <b>{props.userEmail}</b></p>
    <p>Phone number: <b> {props.userPhone}</b></p>
    <p>Last login on: <b>{props.lastSignedIn}</b></p>
    <p>Account created on: <b> {props.creationTime}</b></p>

  </div>
)

export default Overview
