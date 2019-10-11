import React from 'react'


const DestCard=(props)=>(
  <div className="form-group row ">
    <div className="col-md-12 dest-card">
      <input type="radio" className="radio_item " value={props.stop} name="dest" id={props.stop}/>
      <label className="label_item" htmlFor={props.stop}>
        {props.stop}
      </label>
    </div>
  </div>

)

export default DestCard
