import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'
import withAuth from '../lib/helpers/withAuth';
import {auth, firebase} from '../lib/firebase'
import MenuLayout from '../components/MenuLayout'
import Trip from '../components/Trip'
import SelectCompany from '../components/selectCompany'
import router from 'next/router'


class Driver extends React.Component{
  state={
    display:'',
    companies:[]
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
    this.getCompanyList();
  }

  getCompanyList=()=>{
    let db= firebase.firestore();
    db.collection("company").get().then(snapshot=>{
      let data=[];
      if(!snapshot.empty){
        snapshot.forEach(doc=>{
          const d={
            email: doc.data().email,
            fullName: doc.data().fullName,
            companyId: doc.id
          }

          data.push(d);
        })

      }
      this.setState({companies: data});
      console.log(this.state.companies);
    }).catch(err=>{
      console.log(err);
    });

  }

  render(){
    const displayView=()=>{
      if (this.state.display=='startTrip') {
        return(<Trip selectDest={this.selectDest}/>);
      } else if (this.state.display=='viewBus') {
        return(<ViewBus/>);
      } else if (this.state.display=='selectCompany') {
        return(<SelectCompany data={this.state.companies}/>);
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
