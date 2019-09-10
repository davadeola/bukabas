import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const Signupselect=(props)=> (

      <div className="container">
        <h1 className="text-center">Sign up today</h1>
        <form className="login-form">
          <div className="form-group row">
            <select value={props.userType} className="form-control" onChange={props.handleSelect}>
              <option value="">Select user type</option>
              <option value="passenger">Passenger</option>
              <option value="driver">Bus Driver/Conductor</option>
              <option value="company">Bus Company/sacco</option>
            </select>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Select</button>
          </div>
        </form>
      </div>
  );

export default Signupselect
