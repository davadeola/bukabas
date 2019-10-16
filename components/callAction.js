import React from 'react'
import Link from 'next/link'
import {auth, firebase} from '../lib/firebase';
import router from 'next/router';




class CallAction extends React.Component{

  state = {
    isLoggedin: false
  }

  componentDidMount() {
    let listener = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoggedIn: true})
        listener();
      } else {
        this.setState({isLoggedIn: false})
        listener();
      }
    })

  }



  render(){
    return (
      <div className='btn-row'>
        {this.state.isLoggedIn ?
          <Link href='/welcome'>
            <a title='Dashboard'><button className="btn">My Dashboard</button></a>
          </Link>
          :
          <Link href='/signup'>
            <a title='Sign up page'><button className="btn">Get started today</button></a>
          </Link>
        }

      </div>
    )

  }
}
export default CallAction
