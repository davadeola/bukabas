import React from 'react'

const TopNav=(props)=>(
  <div className="top-nav">
      {props.showMenu != null && <button className="btn btn-menu btn-default nav-disp" onClick={props.showMenu}><img src="/static/images/menu.png" className="nav-icon"/></button>}

    <img src='/static/images/logo.png' id="logo"/>
  </div>
)

export default TopNav
