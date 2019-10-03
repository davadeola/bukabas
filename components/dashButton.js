import React from 'react'
import Link from 'next/link'

const DashButton=()=>(
  <div className="dash-btn">
    <Link href='/welcome'>
      <a title='Dashboard'>
        <button className="btn btn-success ">Dashboard</button>
      </a>
    </Link>
  </div>
)

export default DashButton
