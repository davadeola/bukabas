import React from 'react'
import CompRadio from './compRadio'


class AssignDriver extends React.Component{

  state={
    bus:'',
    driver:''
  }

  handleChange=(event)=>{
    this.setState({driver: event.target.value});
  }


  handleChangeBus=(event)=>{
    this.setState({bus: event.target.value});
  }

  render(){
    return(
      <div className="container text-center">
        <img src="/static/images/assign.png" className="profile-img"/>
      <h1 className="text-center">Assign a driver to a bus</h1>
      <form className="login-form" onSubmit={this.props.handleAssignDriver}>
        <div className="row">
          <div className="col-md-12">
            <select value={this.state.driver} onChange={this.handleChange} className='form-control' name="driver">
              <option value="">Select your driver</option>
              {this.props.drivers.map(driver=><CompRadio key={driver.driverId} fullName={driver.fullName} id={driver.driverId}/>)}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <select value={this.state.bus} onChange={this.handleChangeBus} className='form-control' name="bus">
              <option value="">Assign bus to driver</option>
              {this.props.buses.map(bus=><CompRadio key={bus.numplate} fullName={bus.numplate} id={bus.numplate}/>)}
            </select>

              <button type="submit" className="btn btn-primary">Assign</button>
          </div>
        </div>
        <div>

        </div>
      </form>

      </div>
    )

  }
}
export default AssignDriver
