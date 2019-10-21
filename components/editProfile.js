import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'

const EditProfile=(props)=>(

      <div className="container ">
        <h1 className="text-center">Edit your profile</h1>
        <form className="login-form" onSubmit={props.handleEditProfile}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group row">
                <label>Full name</label>
                <input name="fullName" type="text" placeholder="Full Name" className="form-control" />
              </div>
              <div className="form-group row">
                <label>Phone number</label>
                <input name="phone" type="text" placeholder="Phone number" className="form-control" />
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Edit</button>
          </div>
        </form>
      </div>
    );
export default EditProfile
