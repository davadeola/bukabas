import React from 'react'

const CompRadio =(props)=>(
  <div className="col-md-12">
    <input type="radio" name="comp"  value={props.companyId} className='form-check-input'/>
    <label>{props.fullName}</label>
  </div>
)

export default CompRadio
