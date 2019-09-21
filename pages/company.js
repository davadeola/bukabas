import React from 'react'

import Layout from '../components/Layout'
import MenuLayout from '../components/MenuLayout'
import withAuth from '../lib/helpers/withAuth'
import Map from '../components/Map'
import {auth, firebase} from '../lib/firebase'
import AddNewBus from '../components/addNewBus'
import ViewBus from '../components/viewBus'


class Company extends React.Component{
  state={
    display:'',
    numplate:'',
    busType:''
  }

  selectAddBus=()=>{
    this.setState({display:'addNew'});
    console.log(this.props.userType);
  }
  selectViewBus=()=>{
    this.setState({display:'viewBus'});
  }

  handleAddBus=(e)=>{
    e.preventDefault();
    const userType = this.props.userType;
    this.setState({
      numplate: e.target.elements.numplate.value,
      busType: e.target.elements.busType.value
    },()=>{
      let db = firebase.firestore();
      db.collection("bus").doc(this.state.numplate).get()
      .then(doc=>{
        if (doc.exists) {
          alert("This username already exists");
        }else{
          let busCrendentials={
            busType: this.state.busType,
            company: this.props.userName
          }
          db.collection("bus").doc(this.state.numplate).set(busCrendentials).then(()=>{
             alert("Successfully add a a new bus");
          })
        }
      })
    }
  )


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
                  <MenuLayout display={this.state.display} selectAddBus={this.selectAddBus} selectViewBus={this.selectViewBus} userType={props.userType}/>
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
