import React from 'react'
import Link from 'next/link'
import Loginbtn from './loginbtn'
import {auth, firebase} from '../lib/firebase';
import router from 'next/router';
import DashButton from './dashButton'



class Nav extends React.Component{

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

  handleSignOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(()=>{
      this.setState({isLoggedIn: false});
      router.push('/');

    }).catch(function(error) {
      alert('Oops! There was an error');
      console.log(error);
    });
  }

  render(){
    return (
      <div>
        <nav className="navbar navbar-light bg-light fixed-bottom">
          <Link href='/'>
            <a title="Home">
              <button className="btn btn-default nav-disp text-center"><img src="/static/images/home-icon.png" className="nav-icon"/>Home</button>
            </a>
          </Link>
          {this.state.isLoggedIn ? <DashButton/> : <Link href='/signup'>
            <a title="Sign up">
              <button className="btn btn-default nav-disp text-center"><img src="/static/images/new-account.png" className="nav-icon"/>Sign up</button>
            </a>
          </Link>}
          <Loginbtn isLoggedIn={this.state.isLoggedIn} handleSignOut={this.handleSignOut}/>
        </nav>
    </div>
    )

  }
}
export default Nav
