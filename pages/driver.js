import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'
import withAuth from '../lib/helpers/withAuth';
import MenuLayout from '../components/MenuLayout'


class Driver extends React.Component{
  state={
    display:'',

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
    )
  }
}
export default withAuth(Driver)
