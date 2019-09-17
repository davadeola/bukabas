import React,{ useState } from 'react'
import ReactMapGL, {GeolocateControl , NavigationControl, Marker} from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN='pk.eyJ1IjoiZGF2YWJpbSIsImEiOiJjazA5emFvbHUwZDJzM25wZXFpZjNwcjBuIn0.H9lwEiaM2y3NAZ6RFCQTqQ'

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

const Map = () => {


  //<ReactMapGL  latitude={37.7577} longitude={-122.4376} zoom={8}  onViewportChange={(viewport)=>{}}/>
  //const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 3000 })

  return (
    <div style={{ margin: '0 auto'}}>



    <ReactMapGL latitude={37.78} longitude={-122.41} zoom={15} width="100%" height="85vh" mapboxApiAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/streets-v8">
       <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
         <img className="marker" src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png"/>
       </Marker>
     </ReactMapGL>
     </div>
  )
}

export default Map
