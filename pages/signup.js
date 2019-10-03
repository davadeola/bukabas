import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'
import Signupselect from '../components/signupselect'
import SignUpform from '../components/signUpForm'
import router from 'next/router'
import Loadscreen from '../components/loadingScreen'
import {auth, firebase} from '../lib/firebase'

class Signup extends React.Component {
  state = {
    email: '',
    userHandle:'',
    fullName: '',
    password:'',
    phone:'',
    userType: '',
    showLoadScreen: false
  }

  showLoadScreen = () => {
    this.setState({
      ...this.state,
      showLoadScreen: true
    })
  }


  backToSelect=()=>{
    this.setState({
      ...this.state,
      userType: ''
    })
  }


  handleSignUp = (e) => {
    e.preventDefault();
    this.showLoadScreen();
    try {
      this.setState({
        email : e.target.elements.email.value,
        password : e.target.elements.password.value,
        userHandle : e.target.elements.userHandle.value,
        fullName : e.target.elements.fullName.value,
        phone:e.target.elements.phone.value,
      }, ()=>{

      let db = firebase.firestore();
      db.collection(this.state.userType).doc(this.state.userHandle).get()
      .then(doc=>{
        if (doc.exists) {
          alert("This username already exists");
          router.push('/signup');
        } else {
          firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
            let userCredentials={
              email: this.state.email,
              fullName: this.state.fullName,
              phone:this.state.phone,
              userType: this.state.userType
            }
            // console.log(this.state.userHandle);
            db.collection(this.state.userType).doc(this.state.userHandle).set(userCredentials).then(()=>{
              alert("Successfully created");
              var newRoute = '/'.concat(this.state.userType);
              router.push(newRoute);
            })
          }).catch((err)=>{
            alert(err.message+" Please try again");
            location.reload(false);
          })
        }
      });
    });
    } catch (e) {
      console.log(e);
    }

}

  handleSelect = (e) => {
    e.preventDefault();
    this.setState({userType: e.target.value});
  }

  render() {
    const RenderContent = () => {
      if (this.state.userType) {
        return <SignUpform handleSignUp={this.handleSignUp} backToSelect={this.backToSelect}/>
    }  else {
        return <Signupselect handleSelect={this.handleSelect}/>
      }
    }

    return (<Layout>
      {this.state.showLoadScreen && <Loadscreen/>}
      <RenderContent/>

      <Link href='login'>
        <a>
          <p className="text-center">Already have an account? Login here</p>
        </a>
      </Link>

    </Layout>)
  }

}

export default Signup
