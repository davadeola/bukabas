import React from 'react'

const DriverInfo=(props)=>(
  <div className="container driver-info">
    <div className="row">
      <div className="col-md-12">
          <h3 className="font-weight-bold" style={{color: '#34d7d7'}}>{props.fullName || "Click bus to view details"}</h3>
          <p className=""><b>Number plate: </b>{props.busNumplate}</p>
          <p className=""><b>Phone No: </b>{props.phone}</p>
          <p className=""><b>Destination: </b>{props.destination}</p>
      </div>
    </div>
  </div>
)

export default DriverInfo
