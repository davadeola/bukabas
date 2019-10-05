import React from 'react'

const CompRadio =(props)=>(

    // <input type="radio" name="comp"  value={props.companyId} className='form-check-input'/>
    // <label>{props.fullName}</label>
    <option value={props.id}>{props.fullName}</option>

)

export default CompRadio
