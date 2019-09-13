import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

const Signupselect = (props) => (<div className="container">
<div className="row">
  <div className="col-md-12">
  <h1 className="text-center">Sign up today</h1>
  <form className="login-form">
    <div className="form-group row form-group-select" onChange={props.handleSelect}>

      <div className="col-md-4">
        <input type="radio" className="radio_item" value="passenger" name="item" id="passenger_radio"/>
        <label className="label_item" htmlFor="passenger_radio">
          <img src="/static/images/pass.png"/>
        </label>
        <h3>Passenger</h3>
      </div>
      <div className="col-md-4">
        <input type="radio" className="radio_item" value="driver" name="item" id="driver_radio"/>
        <label className="label_item" htmlFor="driver_radio">
          <img src="/static/images/driver.png"/>
        </label>
        <h3>Driver</h3>
      </div>
      <div className="col-md-4">
        <input type="radio" className="radio_item" value="company" name="item" id="company_radio"/>
        <label className="label_item" htmlFor="company_radio">
          <img src="/static/images/comp.png"/>
        </label>
        <h3>Bus Company</h3>
      </div>

    </div>

  </form>
  </div>
</div>
</div>);

export default Signupselect
