import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'
import MenuLayout from '../components/MenuLayout'
import withAuth from '../lib/helpers/withAuth';
import GoogleMap from 'google-map-react';
import Map from '../components/Map'


const Passenger = (props) => (<Layout>
  <div>
    <Map/>
  </div>
</Layout>)

export default withAuth(Passenger)
