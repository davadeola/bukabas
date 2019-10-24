import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'
import Signupselect from '../components/signupselect'
import SignUpform from '../components/signUpForm'
import { toast } from 'react-toastify';

import router from 'next/router'
import Loadscreen from '../components/loadingScreen'
import {auth, firebase} from '../lib/firebase'
import TopNav from '../components/topNav'
import ImageUpload from '../components/imageUpload'

class Signup extends React.Component {


  state = {
    email: '',
    userHandle:'',
    fullName: '',
    password:'',
    phone:'',
    userType: '',
    showLoadScreen: false,
    upload: false,
    doneUploading:false
  }

  componentDidMount(){
    toast.configure();
  }

  doneUploading=()=>{
    this.setState({ doneUploading: true});
    this.onFinishedUploading();
  }

  onFinishedUploading=()=>{
    router.push('/'+this.state.userType);
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
          toast("This username already exists", {type: toast.TYPE.ERROR, autoClose: 2000, onClose: ()=>{
              location.reload(false);
          }})

        } else {
          firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
            let userCredentials={
              email: this.state.email,
              fullName: this.state.fullName,
              phone:this.state.phone,
              userType: this.state.userType,
              startedTrip: false,
              destination:''
            }

            db.collection(this.state.userType).doc(this.state.userHandle).set(userCredentials).then(()=>{
              toast("Success", {type: toast.TYPE.SUCCESS, autoClose: 2500})

              // var newRoute = '/'.concat(this.state.userType);
              // router.push(newRoute);
              //router.push("/welcome");
              this.setState({upload: true, showLoadScreen: false})
            })
          }).catch((err)=>{
            toast(err.message+" Please try again", {type: toast.TYPE.ERROR, autoclose: 2500, onClose: ()=>{
                location.reload(false);
            }});

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
      if (this.state.userType && !this.state.upload) {
        return <SignUpform handleSignUp={this.handleSignUp} backToSelect={this.backToSelect} newUserType={this.state.userType}/>
    }   else if(this.state.upload && this.state.userType){
        return <ImageUpload email={this.state.email} doneUploading={this.doneUploading}/>
      }else {
        return <Signupselect handleSelect={this.handleSelect}/>
      }
    }

    return (<Layout>
      <TopNav/>
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
