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
    display: '',
    companies: [],
    compFullName: '',
    busNumplate: '',
    fullName: '',
    phoneNum: '',
    startedTrip: false,
    currLocation: {},
    geoId: ''

  }

  selectDest = (e) => {
    e.preventDefault();
    const destination = e.target.elements.dest.value;
    console.log(destination);
    this.getLocation();
  }

  stopTracking = () => {
    this.setState({startedTrip: false});
    navigator.geolocation.clearWatch(this.state.geoId);
    console.log("STopped tracking");
  }

  getLocation = () => {
    this.setState({startedTrip: true});
    if (navigator.geolocation) {
      let GeoId = navigator.geolocation.watchPosition(position => {
        let location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({geoId: GeoId, currLocation: location},()=>{
          console.log(this.state.currLocation);
        });

      }, (err) => {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      }, {
        enableHighAccuracy: false,
        timeout: 1000,
        maximumAge: 0
      })

    } else {
      alert("Geolocation is not supported in your browser");
    }
  }

  selectStartTrip = () => {
    this.setState({display: 'startTrip'});
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
      busNumplate: e.target.elements.bus.value
    }, () => {
      db.collection('driver').doc(this.props.userId).update({"busNumplate": this.state.busNumplate}).then(() => {
        alert("Updated your bus number plate");
      })

      db.collection('bus').doc(this.state.busNumplate).update({"driver": this.props.userName}).then(() => {
        alert("Updated bus information");
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
        alert("Success");
      })
    })
  }

  render() {
    const displayView = () => {
      if (this.state.display == 'startTrip') {
        return (<Trip selectDest={this.selectDest} startedTrip={this.state.startedTrip} stopTracking={this.stopTracking}/>);
      } else if (this.state.display == 'viewBus') {
        return (<ViewBus/>);
      } else if (this.state.display == 'selectCompany') {
        return (<SelectCompany data={this.state.companies} handleSelectCompany={this.handleSelectCompany}/>);
      } else if (this.state.display == 'editProfile') {
        return (<EditProfile handleEditProfile={this.handleEditProfile}/>);
      } else {
        return (<div>
          <h1>Welcome to your Dashboard.</h1>
          <h4>Select an option to begin exploring as a {this.props.userType}</h4>

        </div>)
      }
    }
    return (<Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <MenuLayout selEditProfile={this.selEditProfile} display={this.state.display} selectStartTrip={this.selectStartTrip} selectViewBus={this.selectViewBus} userType={this.props.userType} selectCompany={this.selectCompany} userName={this.props.userName}/>
          </div>
          <div className="col-md-9">
            {displayView()}
          </div>
        </div>

      </div>
    </Layout>)
  }
}
export default withAuth(Driver)
