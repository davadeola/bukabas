import React from 'react'


const Overview=(props)=>(
  <div className="text-center">
    <img src={props.profImg || "/static/images/account.png"} className="account-img"/>
    <h1>Welcome to your Dashboard.</h1>
    <h4>Select an option to begin exploring as a {props.userType}</h4>

  </div>
)

export default Overview
