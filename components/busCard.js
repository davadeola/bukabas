import React from 'react'

const BusCard=(props)=>(
    <div className="col-md-12 card bus-card" onClick={()=>props.getCoord(props.driver)}>
      <h4 className="">Number plate: {props.numplate}</h4>
      <p className="">Bus make: {props.busType}</p>
      <p className=" font-weight-bold">Driver: {props.driver? props.driver : 'unassigned'}</p>
    </div>
)

export default BusCard
