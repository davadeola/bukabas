import React,{ useState } from 'react'
import ReactMapGL, {GeolocateControl , NavigationControl, Marker} from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN=process.env.REACT_APP_TOKEN;

class Map extends React.Component{

  state = {
      viewport: {
        width: "100%",
        height: "75vh",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
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
