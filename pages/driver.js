import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'
import withAuth from '../lib/helpers/withAuth';
import MenuLayout from '../components/MenuLayout'
import Trip from '../components/Trip'
import SelectCompany from '../components/selectCompany'
import router from 'next/router'


class Driver extends React.Component{
  state={
    display:'',

  }

  selectDest=(e)=>{
    e.preventDefault();
    const destination = e.target.elements.dest.value;
    console.log(destination);
  }

  selectStartTrip=()=>{
    this.setState({display:'startTrip'});
    console.log(this.props.userType);
  }

  selectCompany=()=>{
    this.setState({display:'selectCompany'});
  }

  componentDidMount(){
    // if(this.props.userType != 'driver'){
    //   alert("You are not allowed to view this page");
    //   router.push("/")
    // }
  }

  render(){
    const displayView=()=>{
      if (this.state.display=='startTrip') {
        return(<Trip selectDest={this.selectDest}/>);
      } else if (this.state.display=='viewBus') {
        return(<ViewBus/>);
      } else if (this.state.display=='selectCompany') {
        return(<SelectCompany/>);
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
                <MenuLayout display={this.state.display} selectStartTrip={this.selectStartTrip} selectViewBus={this.selectViewBus} userType={this.props.userType} selectCompany={this.selectCompany}/>
            </div>
            <div className="col-md-9">
              {displayView()}
            </div>
          </div>

        </div>
    </Layout>
    )
  }
}
export default withAuth(Driver)
