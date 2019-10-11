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
import EditProfile from '../components/editProfile'

class Driver extends React.Component {
  state = {
    showMenu:false,
    display: '',
    companies: [],
    compFullName: '',
    busNumplate: '',
    fullName: '',
    phoneNum: '',
    startedTrip: false,
    currLocation: {},
    geoId: '',
    destination:'',
    stops:["Donholm", "CBD", "Strathmore", "Lang'ata"]
  }


  showMenu=()=>{
    this.setState({showMenu: true})
  }

  dropMenu=()=>{
    this.setState({showMenu: false})
  }

  getPreviousLoc=()=>{
    let db = firebase.firestore();
    let drivAccount = db.collection('driver').doc(this.props.userId).get().then(doc=>{
      if (doc.exists) {

          this.setState({
            startedTrip: doc.data().startedTrip,
            geoId: doc.data().geoId,
            destination: doc.data().destination,
            currLocation:doc.data().currLocation
          })
      }
    }).catch(err=>{
      console.log(err.message);
    })


  }

  selectDest = (e) => {

    e.preventDefault();

    const destination = e.target.elements.dest.value;
    let db = firebase.firestore();
    this.setState({startedTrip: true}, ()=>{
      if (navigator.geolocation && this.state.startedTrip) {
        let GeoId = navigator.geolocation.watchPosition(position => {
          let location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.setState({geoId: GeoId, currLocation: location},()=>{
            db.collection('driver').doc(this.props.userId).update({"location": this.state.currLocation, "destination":destination, "geoId": this.state.geoId, "startedTrip": this.state.startedTrip}).then(() => {
              console.log(this.state.currLocation +". Updated your location");
            })
          });

        }, (err) => {
          console.warn('ERROR(' + err.code + '): ' + err.message);
        },{
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0
        })

      } else {
        alert("Geolocation is not supported in your browser");
      }
    });


  }

  stopTracking = () => {
    let db = firebase.firestore();
    this.setState({startedTrip: false});

    navigator.geolocation.clearWatch(this.state.geoId);
    db.collection(this.props.userType).doc(this.props.userId).update({startedTrip: false}).then(() => {
      alert("You have ended your trip");
    })
    console.log("STopped tracking");
  }



  selectStartTrip = () => {
    this.setState({display: 'startTrip'});
    this.getPreviousLoc();
  }

  selectCompany = () => {
    this.setState({display: 'selectCompany'});
    this.getCompanyList();
  }

  selEditProfile = () => {
    this.setState({display: 'editProfile'})
  }

  getCompanyList = () => {
    let db = firebase.firestore();
    db.collection("company").get().then(snapshot => {
      let data = [];
      if (!snapshot.empty) {
        snapshot.forEach(doc => {
          const d = {
            email: doc.data().email,
            fullName: doc.data().fullName,
            companyId: doc.id
          }

          data.push(d);
        })

      }
      this.setState({companies: data});

    }).catch(err => {
      console.log(err);
    });

  }

  handleSelectCompany = (e) => {
    e.preventDefault();
    let db = firebase.firestore();
    this.setState({
      compFullName: e.target.elements.comp.value,

    }, () => {
        db.collection('driver').doc(this.props.userId).update({"compFullName": this.state.compFullName}).then(() => {
          alert("Successfully changed your company");
        })
    })
  }

  handleEditProfile = (e) => {
    e.preventDefault();
    let db = firebase.firestore();
    this.setState({
      fullName: e.target.elements.fullName.value,
      phoneNum: e.target.elements.phone.value
    }, () => {
      db.collection(this.props.userType).doc(this.props.userId).update({fullName: this.state.fullName, phone: this.state.phoneNum}).then(() => {
        alert("Success. Profile Edited");
      })
    })
  }

  render() {
    const displayView = () => {
      if (this.state.display == 'startTrip') {
        return (<Trip selectDest={this.selectDest} startedTrip={this.state.startedTrip} stopTracking={this.stopTracking} userType={this.props.userType} stops={this.state.stops}/>);
      } else if (this.state.display == 'viewBus') {
        return (<ViewBus/>);
      } else if (this.state.display == 'selectCompany') {
        return (<SelectCompany data={this.state.companies} handleSelectCompany={this.handleSelectCompany}/>);
      } else if (this.state.display == 'editProfile') {
        return (<EditProfile handleEditProfile={this.handleEditProfile}/>);
      } else {
        return (<div className="text-center">
          <h1>Welcome to your Dashboard.</h1>
          <h4>Select an option to begin exploring as a {this.props.userType}</h4>

        </div>)
      }
    }
    return (<Layout>
      <div className="container-fluid">
        {this.state.showMenu && <div className="col-md-2">
          <MenuLayout dropMenu={this.dropMenu} selEditProfile={this.selEditProfile} display={this.state.display} selectStartTrip={this.selectStartTrip} selectViewBus={this.selectViewBus} userType={this.props.userType} selectCompany={this.selectCompany} userName={this.props.userName}/>
        </div>}
        <div className="row">
          <div className="col-md-2">
            <button className="btn btn-menu btn-default nav-disp" onClick={this.showMenu}><img src="/static/images/menu.png" className="nav-icon"/></button>
          </div>



          <div className="col-md-10">
            {displayView()}
          </div>
        </div>

      </div>
    </Layout>)
  }
}
export default withAuth(Driver)
