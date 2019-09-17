import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from './nav'


const MenuLayout = (props) => (
<div>
  <div className="my-landing">

  {props.children}
  </div>
</div>
)

export default MenuLayout
