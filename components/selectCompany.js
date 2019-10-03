import React from 'react'
import CompRadio from './compRadio'

const SelectCompany=(props)=>(
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h1>Select the company you work for</h1>
      </div>
    </div>

    <div className="row">
      <div className="col-md-12">
        <form className="form">
          {props.data.map(comp=><CompRadio key={comp.companyId} fullName={comp.fullName} companyId={comp.companyId}/>)}
        </form>
      </div>
    </div>

  </div>
)

export default SelectCompany
