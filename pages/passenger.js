import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'
import MenuLayout from '../components/MenuLayout'
import withAuth from '../lib/helpers/withAuth';


const Passenger = (props) => (
  <Layout>
    <MenuLayout/>
  </Layout>
)

export default withAuth(Passenger)
