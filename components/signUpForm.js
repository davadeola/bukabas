import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'


const SignUpform=(props)=>(

      <div className="container ">
        <h1 className="text-center">Create a new {props.newUserType} account</h1>
        <form className="login-form" onSubmit={props.handleSignUp}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group row">
                <label>User Handle</label>
                <input name="userHandle" type="text" placeholder="Enter your user handle" className="form-control" required/>
              </div>
              <div className="form-group row">
                <label>Full name</label>
                <input name="fullName" type="text" placeholder="Enter your full name" className="form-control" required/>
              </div>
              <div className="form-group row">
                <label>Email</label>
                <input name="email" type="email" placeholder="Enter your email" className="form-control" required/>
              </div>
              <div className="form-group row">
                <label>Phone number</label>
                <input name="phone" type="text" placeholder="Enter your phone number" className="form-control" required/>
              </div>
              <div className="form-group row">
                <label>Password</label>
                <input name="password" type="password" placeholder="Enter your password" className="form-control" required/>
              </div>

            </div>



          </div>



          <div className="form-group row">
            <div className="col-sm-6">
              <button className="btn btn-warning" onClick={props.backToSelect}>Back</button>
            </div>
            <div className="col-sm-6">
                <button type="submit" className="btn btn-primary">Create Account</button>
            </div>


          </div>
        </form>
      </div>
    );
export default SignUpform
