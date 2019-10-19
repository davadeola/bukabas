import React from 'react'
import Link from 'next/link'

const DashButton=(props)=>(
  <div className="dash-btn">
    <Link href={'/'+props.link}>
      <a title='Dashboard'>
        <button className="btn nav-disp" ><img src="/static/images/dashboard.png" className="nav-icon"/>Dashboard</button>
      </a>
    </Link>
  </div>
)

export default DashButton
