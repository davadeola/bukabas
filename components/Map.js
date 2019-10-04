import React,{ useState } from 'react'
import ReactMapGL, {GeolocateControl , NavigationControl, Marker} from 'react-map-gl'
import axios from 'axios';
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify'



const TOKEN=process.env.REACT_APP_TOKEN;

class Map extends React.Component{

  state = {
      viewport: {
        width: "100%",
        height: "75vh",
        latitude: -1.28333 ,
        longitude: 36.81667,
        zoom: 8
      },

    };
render(){
  const { viewport } = this.state;
  return (
    <div style={{ margin: '0 auto'}}>
    <ReactMapGL latitude={viewport.latitude} longitude={viewport.longitude} zoom={viewport.zoom} width={viewport.width} height={viewport.height} mapboxApiAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/streets-v8" onViewportChange={(viewport) => this.setState({viewport})}>
       <Marker latitude={viewport.latitude} longitude={viewport.longitude} offsetLeft={-20} offsetTop={-10}>
         <img className="marker" src="/static/images/bus-marker.png"/>
       </Marker>
     </ReactMapGL>
     </div>
  )
}
}

export default Map
