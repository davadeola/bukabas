import React,{ useState } from 'react'
import ReactMapGL, {GeolocateControl , NavigationControl, Marker} from 'react-map-gl'
import axios from 'axios';
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify'



const TOKEN=process.env.REACT_APP_TOKEN;

class PassMap extends React.Component{

  state = {
      viewport: {
        width: "100%",
        height: "75vh",
        zoom: 15,
        latitude:1.2921,
        longitude:36.8219
      },

    }


    onViewportChange=(viewport) =>{
      this.setState({viewport});
    }


render(){
  const { viewport } = this.state;
  return (
    <div style={{ margin: '0 auto'}}>
    <ReactMapGL latitude={this.props.currLocation.lat} longitude={this.props.currLocation.lng} zoom={viewport.zoom} width={viewport.width} height={viewport.height} mapboxApiAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/streets-v8"  onViewportChange={this.onViewportChange}>
      {this.props.buses.map(bus=>
        <Marker key={bus.driverId} latitude={bus.location.lat} longitude={bus.location.lng} offsetLeft={-20} offsetTop={-10}>
          <img className="marker" src="/static/images/bus-marker.png"/>
        </Marker>
      )}

      <Marker latitude={this.props.currLocation.lat} longitude={this.props.currLocation.lng} offsetLeft={-20} offsetTop={-10}>
        <img className="marker" src="/static/images/pass-marker.png"/>
      </Marker>
       <div style={{position: 'absolute', right: 0}}>
         <NavigationControl captureClick={true}/>
       </div>
     </ReactMapGL>
     </div>
  )
}
}

export default PassMap
