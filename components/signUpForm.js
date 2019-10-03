import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'

const SignUpform=(props)=>(

      <div className="container ">
        <h1 className="text-center">Create a company account</h1>
        <form className="login-form" onSubmit={props.handleSignUp}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group row">
                <input name="userHandle" type="text" placeholder="Enter your company user handle" className="form-control" />
              </div>
              <div className="form-group row">
                <input name="fullName" type="text" placeholder="Enter your company full name" className="form-control" />
              </div>
              <div className="form-group row">
                <input name="email" type="email" placeholder="Enter your email" className="form-control"/>
              </div>
              <div className="form-group row">
                <input name="phone" type="text" placeholder="Enter your phone number" className="form-control"/>
              </div>
              <div className="form-group row">
                <input name="password" type="password" placeholder="Enter your password" className="form-control"/>
              </div>
              <div className="form-group row">
                <input name="conpassword" type="password" placeholder="Confirm your password" className="form-control"/>
              </div>
            </div>


          </div>



          <div>
            <button type="submit" className="btn btn-primary">Create Account</button>
          </div>
        </form>
      </div>
    );
export default SignUpform
