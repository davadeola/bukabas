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

        <div className="text-center col-md-12">
          {
            props.userType=='company' &&
            <div>
              <div className="card menu-card" onClick={props.selectAddBus}>Add New Bus</div>
              <div className="card menu-card" onClick={props.selectViewBus}>View my bus</div>
            </div>
            }
          {props.userType=='driver' &&
            <div>
              <div className="card menu-card" onClick={props.selectCompany}>Select your bus</div>
              <div className="card menu-card" onClick={props.selectStartTrip}>Choose destination</div>
            </div>
          }
          {props.userType=='passenger' &&
            <div>
              
              <div className="card menu-card" onClick={props.selectStartTrip}>Choose destination</div>
            </div>
          }
          <div className="card menu-card" onClick={props.selEditProfile}>Edit profile</div>

          </div>

      </div>

    </div>
  </div>
)

export default MenuLayout
