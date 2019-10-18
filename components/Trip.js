import React from 'react'
import DestCard from './destCard'


const Trip=(props)=>(

  <div className="container">

    <h1>{props.destination && props.startedTrip ? "Destination :" + props.destination : "Select your destination"}</h1>

  {!props.startedTrip &&
    <form  className="form radio-form" onSubmit={props.selectDest}>

      {props.stops.map(stop=><DestCard key={stop} stop={stop}/>)}


      <div className="form-group row">
        <div className="col-md-12">

          { props.userType=='driver' && props.startedTrip==false && <button type="submit" className="btn-success btn">Start trip</button>}
          {props.userType=='passenger' && props.startedTrip==false && <button type="submit" className="btn-success btn">Find bus</button>}

        </div>
      </div>
    </form>

}
    <div className="row">
      <div className="col-md-12 text-center">
        {props.startedTrip && props.userType=='passenger' && <button className="btn-warning btn" onClick={props.stopTracking}>Stop search</button>}
        {props.startedTrip && props.userType=='driver' && <button className="btn-warning btn" onClick={props.stopTracking}>Stop trip</button>}
        {props.startedTrip && props.userType=='passenger' && <button className="btn-success btn" onClick={props.showMap}>Show Map</button>}

      </div>
    </div>

  </div>

)

export default Trip;
