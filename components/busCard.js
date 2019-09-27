import React from 'react'

const BusCard=(props)=>(
    <div className="col-md-12 card bus-card">
      <h4 className="">{props.numplate}</h4>
      <p className="text-muted">{props.busType}</p>
    </div>
)

export default BusCard
