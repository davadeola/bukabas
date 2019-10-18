import React,{ useState } from 'react'
import ReactMapGL, {GeolocateControl , NavigationControl, Marker, Popup} from 'react-map-gl'
import axios from 'axios';
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify'
import DriverInfo from './driverInfo'



const TOKEN=process.env.REACT_APP_TOKEN;

class PassMap extends React.Component{

  state = {
      viewport: {
        width: "100%",
        height: "75vh",
        zoom: 12,
        latitude:1.2921,
        longitude:36.8219
      },
      popupInfo:true,
      fullName:'',
      busNumplate:'',
      destination:'',
      phone:''
    }


    onViewportChange=(viewport) =>{
      this.setState({viewport});
    }


  selBusMap=(fullName)=>{
      this.setState({popupInfo: true, fullName: fullName});
    }

    showPopup=(bus)=>{
      console.log(bus);

      this.setState({fullName: bus.fullName, busNumplate: bus.busNumplate, phone: bus.phone, destination: bus.destination});

    }

render(){
  const { viewport } = this.state;
  return (
    <div style={{ margin: '0 auto'}}>
    <ReactMapGL latitude={this.props.currLocation.lat} longitude={this.props.currLocation.lng} zoom={viewport.zoom} width={viewport.width} height={viewport.height} mapboxApiAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/streets-v8"  onViewportChange={this.onViewportChange}>
      {this.props.buses.map(bus=>
        <Marker key={bus.driverId} latitude={bus.location.lat} longitude={bus.location.lng} busNumplate={bus.busNumplate} fullName={bus.fullName} offsetLeft={-20} offsetTop={-10} >
          <img className="marker" src="/static/images/bus-marker.png" onClick={()=>{this.showPopup(bus)}}/>
        </Marker>
      )}


      <Marker latitude={this.props.currLocation.lat} longitude={this.props.currLocation.lng} offsetLeft={-20} offsetTop={-10}>
        <img className="marker" src="/static/images/pass-marker.png"/>
      </Marker>

       <div style={{position: 'absolute', bottom: 0}}>
         <DriverInfo fullName={this.state.fullName} busNumplate={this.state.busNumplate} phone={this.state.phone} destination={this.state.destination}/>
       </div>
       <div style={{position: 'absolute', right: 0}}>
         <NavigationControl captureClick={true} onViewportChange={this.onViewportChange}/>
       </div>
     </ReactMapGL>
     </div>
  )
}
}

export default PassMap
