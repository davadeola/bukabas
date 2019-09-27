import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from './nav'
import ProfileInfo from './profileInfo'



const MenuLayout = (props) => (

  <div className="menu-layout">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <ProfileInfo/>
        </div>
      </div>
      <div className="row ">


          {
            props.userType=='company' &&
            <div className="text-center col-md-12">
              <div className="card menu-card" onClick={props.selectAddBus}>Add New Bus</div>
              <div className="card menu-card" onClick={props.selectViewBus}>View my bus</div>
            </div>
            }
          {props.userType=='driver' &&
              <div className="text-center col-md-12">
            <div className="card menu-card" onClick={props.selectStartTrip}>Choose destination</div>
            </div>
          }



      </div>

    </div>
  </div>
)

export default MenuLayout
