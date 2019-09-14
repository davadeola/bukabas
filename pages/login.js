import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/Layout'
import Nav from '../components/nav'
import {auth, firebase} from '../lib/firebase'
import router from 'next/router'
import Loadscreen from '../components/loadingScreen'

class Login extends React.Component{
  state={
    signedIn :false,
    showLoadScreen: false
  }

  showLoadScreen=()=>{
    this.setState({
      ...this.state,
      showLoadScreen: true
    })
  }

  handleSignIn=(e)=>{
    e.preventDefault();
    this.showLoadScreen();
    const email=e.target.elements.email.value;
    const password = e.target.elements.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      this.setState({signedIn: true})
      router.push('/passenger')
    })
    .catch(err=>{
      alert(err.message);
      console.log(err);
      router.push('/login')
    })
  }
  render(){
    return(
      <Layout>
      {this.state.showLoadScreen && <Loadscreen/>}
      <div className="container loading">
        <h1 className="text-center">Sign in</h1>
        <form className="login-form" onSubmit={this.handleSignIn}>
          <div className="form-group row">
            <input name="email" type="email" placeholder="Enter your email" className="form-control"/>
          </div>
          <div className="form-group row">
            <input name="password" type="password" placeholder="Enter your password" className="form-control"/>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>
        </form>
        <Link href='signup'>
          <a>
            <p className="text-center">New user? Click here to join the family</p>
          </a>
        </Link>
      </div>
    </Layout>)
  }

}

export default Login
