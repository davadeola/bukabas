import React from 'react'
import Layout from '../components/Layout'
import MenuLayout from '../components/MenuLayout'
import withAuth from '../lib/helpers/withAuth';
import EditProfile from '../components/editProfile'
import Trip from '../components/Trip'
import {auth, firebase} from '../lib/firebase'

//import Map from '../components/Map'


class Passenger extends React.Component{

  state={
    display:'',
    fullName: '',
    phoneNum:''
  }

  selectStartTrip=()=>{
    this.setState({display:'startTrip'});
    console.log(this.props.userType);
  }

  selEditProfile=()=>{
    this.setState({display:'editProfile'})
  }


  handleEditProfile=(e)=>{
    e.preventDefault();
    let db = firebase.firestore();
    this.setState({
      fullName: e.target.elements.fullName.value,
      phoneNum: e.target.elements.phone.value
    }, ()=>{
      db.collection(this.props.userType).doc(this.props.userId).update(
        {
          fullName: this.state.fullName,
          phone:this.state.phoneNum
        }).then(()=>{
        alert("Success");
      })
    })
  }

    render(){

      const displayView=()=>{
        if (this.state.display=='startTrip') {
          return(<Trip selectDest={this.selectDest}/>);
        }else if (this.state.display=='editProfile') {
          return(<EditProfile handleEditProfile={this.handleEditProfile}/>);
        }  else {
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
                    <MenuLayout selEditProfile={this.selEditProfile} display={this.state.display} selectStartTrip={this.selectStartTrip}  userType={this.props.userType} />
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

export default withAuth(Passenger)
