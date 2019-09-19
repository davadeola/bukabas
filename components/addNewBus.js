import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'

const AddNewBus=(props)=>(

      <div className="container ">
        <h1 className="text-center">Add a new bus to your fleet</h1>
        <form className="login-form" onSubmit={props.handleAddBus}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group row">
                <input name="numplate" type="text" placeholder="Enter the number plate" className="form-control" />
              </div>
              <div className="form-group row">
                <input name="busType" type="text" placeholder="Enter bus make" className="form-control" />
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Add Bus</button>
          </div>
        </form>
      </div>
    );
export default AddNewBus
