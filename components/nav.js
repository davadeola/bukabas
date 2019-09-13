import React from 'react'
import Link from 'next/link'
import Loginbtn from './loginbtn'



class Nav extends React.Component{

  render(){
    return (
      <div>
        <nav className="navbar navbar-light bg-light fixed-top">
          <Link href='/'>
            <a>Home</a>
          </Link>
          <Loginbtn/>
        </nav>
    </div>
    )

  }
}
export default Nav
