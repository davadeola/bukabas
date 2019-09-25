import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from './nav'
import ProfileInfo from './profileInfo'



const MenuLayout = (props) => (

  <div className="menu-layout">
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <ProfileInfo/>
        </div>
      </div>
      <div className="row ">
        <div className="d-flex flex-column">

          {
            props.userType=='company' &&
            <div>
              <button className="btn my-tab" onClick={props.selectAddBus}>Add New Bus</button>
              <button className="btn my-tab" onClick={props.selectViewBus}>View my bus</button>
            </div>
            }
          {props.userType=='driver' && <button className="btn my-tab" onClick={props.selectStartTrip}>Start a trip</button>}

          <button className="btn my-tab"></button>
        </div>
      </div>

    </div>
  </div>
)

export default MenuLayout
