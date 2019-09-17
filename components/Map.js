import React,{ useState } from 'react'
import ReactMapGL, {GeolocateControl , NavigationControl} from 'react-map-gl'

// import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN='pk.eyJ1IjoiZGF2YWJpbSIsImEiOiJjazA5emFvbHUwZDJzM25wZXFpZjNwcjBuIn0.H9lwEiaM2y3NAZ6RFCQTqQ'

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

const Map = () => {



  //const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 3000 })

  return (
    <div style={{ margin: '0 auto'}}>
      <ReactMapGL
      width="100%"
      height="85vh"
      latitude={37.7577}
      longitude={-122.4376}
      zoom={8}
      mapboxApiAccessToken={TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v8"
      onViewportChange={(viewport)=>{

        }}
      />
    </div>
  )
}

export default Map
