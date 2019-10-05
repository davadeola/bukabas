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
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Select the company you work for</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <form className="form" onSubmit={this.props.handleSelectCompany}>

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
