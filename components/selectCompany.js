import React from 'react'
import CompRadio from './compRadio'
import {auth, firebase} from '../lib/firebase'

class SelectCompany extends React.Component{
  state={
    value:'',
    buses:[],
    numplate:''
  }

  handleSelNumplate=()=>{
    this.setState({numplate: event.target.value});
  }

  handleChange=(event)=>{

    this.setState({value: event.target.value},()=>{
      let db= firebase.firestore();

      db.collection('bus').where('company', '==', this.state.value).get().then(snapshot=>{
        let data=[];
        if(!snapshot.empty){
          snapshot.forEach(doc => {
            const d={
              numplate : doc.id,
              busType: doc.data().busType
            }

            data.push(d);
          });
          this.setState({buses: data});
        }
      })
    });
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
              {this.props.data.map(comp=><CompRadio key={comp.companyId} fullName={comp.fullName} companyId={comp.companyId}/>)}
            </select>

            <h3>Select the bus number plate</h3>
            <select value={this.state.numplate} onChange={this.handleSelNumplate} className='form-control' name="bus">
              <option value="">Select your bus number plate</option>
              {this.state.buses.map(bus=><CompRadio key={bus.numplate} fullName={bus.numplate}/>)}
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
