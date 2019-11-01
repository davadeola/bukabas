import React from 'react'
import CompRadio from './compRadio'
import {auth, firebase} from '../lib/firebase'

class SelectCompany extends React.Component{
  state={
    value:'',


  }

  handleChange=(event)=>{

    this.setState({value: event.target.value})
  }

  render(){

    return(
      <div className="container ">
        <div className="row">
          <div className="col-md-12 text-center">
            <img src="/static/images/selectComp.png" className="profile-img"/>
            <h2>Select your driving company</h2>
            <h4>You're working at <b>{this.props.currCompany}</b></h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <form className="form login-form" onSubmit={this.props.handleSelectCompany}>

            <select value={this.state.value} onChange={this.handleChange} className='form-control' name="comp">
              <option value="">Select your bus company</option>
              {this.props.data.map(comp=><CompRadio key={comp.companyId} fullName={comp.fullName} id={comp.companyId}/>)}
            </select>
              <button className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>

      </div>
    )
  }
}

export default SelectCompany
