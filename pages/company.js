import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'
import MenuLayout from '../components/MenuLayout'
import withAuth from '../lib/helpers/withAuth';
import GoogleMap from 'google-map-react';
import Map from '../components/Map'
import AddNewBus from '../components/addNewBus'
import ViewBus from '../components/viewBus'


class Company  extends React.Component{
  state={
    display:''
  }

  selectAddBus=()=>{
    this.setState({display:'addNew'});
    console.log(this.props.userType);
  }
  selectViewBus=()=>{
    this.setState({display:'viewBus'});
  }

  render(){
    const displayView=()=>{
      if (this.state.display=='addNew') {
        return(<AddNewBus handleAddBus={this.handleAddBus}/>);
      } else if (this.state.display=='viewBus') {
        return(<ViewBus/>);
      } else {
        return(
          <div>
            <h1>Welcome to your Dashboard.</h1>
            <h4>Select an option to begin exploring as a {this.props.userType}</h4>

          </div>
        )
      }
    }
    return(
        <Layout>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                  <MenuLayout display={this.state.display} selectAddBus={this.selectAddBus} selectViewBus={this.selectViewBus}/>
              </div>
              <div className="col-md-9">
                {displayView()}
              </div>
            </div>

          </div>
      </Layout>
    );
  }

}

export default withAuth(Company)
