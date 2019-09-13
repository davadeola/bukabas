import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'
import Signupselect from '../components/signupselect'
import Passform from '../components/passform'
import Drivform from '../components/drivform'
import Compform from '../components/compform'

class Signup extends React.Component {
  state = {
    userType: '',
    username: '',
    email: '',
    password: '',
    conpassword:'',
    busnumplate:''
  }

  handleSignUp=(e)=>{
    e.preventDefault();

  }

  handleSelect=(e)=>{
    e.preventDefault();
    this.setState({userType:e.target.value});
  }


  render() {
    const RenderContent=()=>{
        if (this.state.userType =="passenger") {
           return <Passform handleSignUp={this.handleSignUp}/>
        } else if (this.state.userType =="driver") {
           return <Drivform handleSignUp={this.handleSignUp}/>
        } else if (this.state.userType =="company") {
           return <Compform handleSignUp={this.handleSignUp}/>
        } else {
           return <Signupselect handleSelect={this.handleSelect}/>
        }
    }

    return (
      <Layout>
        <RenderContent />

        <Link href='login'>
          <a>
            <p className="text-center">Already have an account? Login here</p>
          </a>
        </Link>

    </Layout>)
  }

}

export default Signup
