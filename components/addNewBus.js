import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'
import CompRadio from './compRadio'

class AddNewBus extends React.Component{
  state={
    driver:''
  }

handleChange=(event)=>{
  this.setState({driver: event.target.value})
}

  render(){


    return(

          <div className="container ">
            <h1 className="text-center">Add a new bus to your fleet</h1>
            <form className="login-form" onSubmit={this.props.handleAddBus}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group row">
                    <label>Number plate</label>
                    <input name="numplate" type="text" placeholder="Enter the number plate" className="form-control" />
                  </div>
                  <div className="form-group row">
                    <label>Bus make</label>
                    <input name="busType" type="text" placeholder="Enter bus make" className="form-control" />
                  </div>

                  <select value={this.state.driver} onChange={this.handleChange} className='form-control' name="driver">
                    <option value="">Select your driver</option>
                    {this.props.drivers.map(driver=><CompRadio key={driver.driverId} fullName={driver.fullName} id={driver.driverId}/>)}
                  </select>
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-primary">Add Bus</button>
              </div>
            </form>
          </div>
        )
  }
};
export default AddNewBus
