import React from 'react'
import BusCard from './busCard'

class ViewBus extends React.Component{

  render(){
    return(
      <div className="container">
        <h1>Click to view your buses</h1>
        <div className="row view-bus-dash">
          {this.props.data.map(bus=><BusCard key={bus.numplate} numplate={bus.numplate} busType={bus.busType} driver={bus.driver}  getCoord={this.props.getCoord} startedTrip={bus.startedTrip}/>)}

        </div>

      </div>
    )
  }
}

export default ViewBus
