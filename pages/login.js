import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import {auth, firebase} from '../lib/firebase'
import router from 'next/router'
import Loadscreen from '../components/loadingScreen'
import TopNav from '../components/topNav'

class Login extends React.Component{
  state={
    signedIn :false,
    showLoadScreen: false,
    userType: ''
  }

  verifyDbContent = (ref, email) => {
    ref.where('email', '==', email).onSnapshot(snapshot => {
      if (!snapshot.empty) {
        this.setState({userType:ref.id},()=>{
          console.log(this.state.userType);
          router.push('/'+this.state.userType);
        });

      }

    })
  }

  checkUserType = (email) => {

      let db = firebase.firestore();
      let passenger = db.collection("passenger");
      let driver = db.collection("driver");
      let company = db.collection("company");
      this.verifyDbContent(passenger, email);
      this.verifyDbContent(driver, email);
      this.verifyDbContent(company, email);


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
      this.setState({signedIn: true},()=>{
        this.checkUserType(email);
      })

    })
    .catch(err=>{
      alert(err.message);
      console.log(err);
      location.reload(false);
    })
  }

    //{//this.state.showLoadScreen && <Loadscreen/>}
  render(){
    return(
      <Layout>
      <TopNav/>

      <div className="container loading">
        <h1 className="text-center">Log into your account</h1>
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
