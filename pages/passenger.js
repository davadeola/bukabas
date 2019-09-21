import React from 'react'
import Layout from '../components/Layout'
import MenuLayout from '../components/MenuLayout'
import withAuth from '../lib/helpers/withAuth';
import Map from '../components/Map'


const Passenger = (props) => (<Layout>
  <div>
    <Map/>
  </div>
</Layout>)

export default withAuth(Passenger)
