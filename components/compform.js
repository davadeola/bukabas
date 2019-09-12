import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'

const Compform=(props)=>(

      <div className="container">
        <h1 className="text-center">Create a company account</h1>
        <form className="login-form" onSubmit={props.handleSignUp}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group row">
                <input name="username" type="text" placeholder="Enter your company name" className="form-control" />
              </div>
              <div className="form-group row">
                <input name="email" type="email" placeholder="Enter your email" className="form-control"/>
              </div>
              <div className="form-group row">
                <input name="password" type="password" placeholder="Enter your password" className="form-control"/>
              </div>
              <div className="form-group row">
                <input name="conpassword" type="password" placeholder="Confirm your password" className="form-control"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group row">
                <input name="profilepic" type="file" placeholder="Upload profile image" className="form-control"/>
              </div>
            </div>

          </div>



          <div>
            <button type="submit" className="btn btn-primary">Create Account</button>
          </div>
        </form>
      </div>
    );
export default Compform
