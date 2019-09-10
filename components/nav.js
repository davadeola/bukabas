import React from 'react'
import Link from 'next/link'
import Loginbtn from './loginbtn'



class Nav extends React.Component{

  render(){
    return (
      <div>
      <nav>

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
