import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import Layout from '../components/Layout'
import withAuth from '../lib/helpers/withAuth';
import {auth, firebase} from '../lib/firebase'
import MenuLayout from '../components/MenuLayout'
import { toast } from 'react-toastify';

import Trip from '../components/Trip'
import SelectCompany from '../components/selectCompany'
import router from 'next/router'
import EditProfile from '../components/editProfile'
import Overview from '../components/overview'
import TopNav from '../components/topNav'

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


    componentDidMount(){
      toast.configure();
    }

  showOverview=()=>{
    this.setState({display:'', showMenu: false})
  }

  showMenu=()=>{
    this.setState({showMenu: true})
  }

  dropMenu=()=>{
    this.setState({showMenu: false})
  }

  getPreviousLoc=()=>{
    let db = firebase.firestore();
    let drivAccount = db.collection('driver').doc(this.props.userId).onSnapshot(doc=>{
      if (doc.exists) {

          this.setState({
            startedTrip: doc.data().startedTrip,
            geoId: doc.data().geoId,
            destination: doc.data().destination,
            currLocation:doc.data().currLocation
          })
      }
    },(err)=>{
      console.log(err.message);
    })


  }

  getNumplate=()=>{
    let db = firebase.firestore();
    let drivAccount = db.collection('driver').doc(this.props.userId).onSnapshot(doc=>{
      if (doc.exists) {

          this.setState({
            busNumplate: doc.data().busNumplate,
            compFullName: doc.data().compFullName
          })
      }
    },(err)=>{
      console.log(err.message);
    })
  }

  selectDest = (e) => {
    e.preventDefault();
    if (this.state.busNumplate !="" && this.state.compFullName != '') {



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
                toast("Began tracking your location", {type: toast.TYPE.SUCCESS, autoClose: 2500});

              });

            db.collection('bus').doc(this.state.busNumplate).update({ "startedTrip": this.state.startedTrip}).then(() => {
              console.log("updated bus trip");
            });

          })
        }, (err) => {
            console.warn('ERROR(' + err.code + '): ' + err.message);
          },{
            enableHighAccuracy: true,
            timeout: 1000,
            maximumAge: 0
          })

        } else {
          toast("Geolocation is not supported in your browser", {type: toast.TYPE.ERROR, autoClose: 2500});
        }
      });

    } else {
      toast("Select your company and contact your bus director", {type: toast.TYPE.WARNING, autoClose: 2500});


    }



  }

  stopTracking = () => {
    let db = firebase.firestore();
    this.setState({startedTrip: false});

    navigator.geolocation.clearWatch(this.state.geoId);
    db.collection(this.props.userType).doc(this.props.userId).update({startedTrip: false}).then(() => {
      toast("Stopped tracking your location", {type: toast.TYPE.SUCCESS, autoClose: 2500});

    })
    db.collection('bus').doc(this.state.busNumplate).update({ "startedTrip": false}).then(() => {
      console.log("updated bus trip");
    });

  }



  selectStartTrip = () => {
    this.setState({display: 'startTrip', showMenu: false});
    this.getPreviousLoc();
    this.getNumplate();
  }

  selectCompany = () => {
    this.setState({display: 'selectCompany', showMenu: false});
    this.getCompanyList();
  }

  selEditProfile = () => {
    this.setState({display: 'editProfile', showMenu: false})
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
        db.collection('driver').doc(this.props.userId).update({"compFullName": this.state.compFullName, "busNumplate": ''}).then(() => {
          toast("Success", {type: toast.TYPE.SUCCESS, autoClose: 2500});

        })
        db.collection("bus").where('driver', '==', this.props.userId).get().then(snapshot=>{
               if (!snapshot.empty) {
                 snapshot.forEach(doc=>{
                   db.collection('bus').doc(doc.id).update({"driver": ''})
                 })
               }
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
        toast("Success", {type: toast.TYPE.SUCCESS, autoClose: 2500});

      })
    })
  }

  render() {
    const displayView = () => {
      if (this.state.display == 'startTrip') {
        return (<Trip destination={this.state.destination} selectDest={this.selectDest} startedTrip={this.state.startedTrip} stopTracking={this.stopTracking} userType={this.props.userType} stops={this.state.stops}/>);
      } else if (this.state.display == 'viewBus') {
        return (<ViewBus/>);
      } else if (this.state.display == 'selectCompany') {
        return (<SelectCompany data={this.state.companies} handleSelectCompany={this.handleSelectCompany}/>);
      } else if (this.state.display == 'editProfile') {
        return (<EditProfile handleEditProfile={this.handleEditProfile}/>);
      } else {
        return (<Overview profImg={this.props.profImg} userType={this.props.userType} lastSignedIn={this.props.lastSignedIn} creationTime={this.props.creationTime} userEmail={this.props.userEmail} userPhone={this.props.userPhone}/>)
      }
    }
    return (<Layout>
      <TopNav showMenu={this.showMenu}/>

      <div className="container-fluid">
        {this.state.showMenu && <div className="col-md-2">
          <MenuLayout showOverview={this.showOverview} profImg={this.props.profImg} dropMenu={this.dropMenu} selEditProfile={this.selEditProfile} display={this.state.display} selectStartTrip={this.selectStartTrip} selectViewBus={this.selectViewBus} userType={this.props.userType} selectCompany={this.selectCompany} userName={this.props.userName}/>
        </div>}
        <div className="row">




          <div className="col-md-12">
            {displayView()}
          </div>
        </div>

      </div>
    </Layout>)
  }
}
export default withAuth(Driver)
