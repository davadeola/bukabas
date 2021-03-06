import React from 'react'
import Layout from '../components/Layout'
import MenuLayout from '../components/MenuLayout'
import withAuth from '../lib/helpers/withAuth';
import EditProfile from '../components/editProfile'
import Trip from '../components/Trip'
import {toast} from 'react-toastify';

import {auth, firebase} from '../lib/firebase'
import PassMap from '../components/passMap'
import Overview from '../components/overview'
import TopNav from '../components/topNav'
import {getDistance} from 'geolib';

class Passenger extends React.Component {

  state = {
    showMenu: false,
    display: '',
    fullName: '',
    phoneNum: '',
    movingBuses: [],
    myBuses: [],
    currLocation: {},
    geoId: '',
    startedTrip: false,
    stops: [
      "Donholm", "CBD", "Strathmore", "Lang'ata"
    ],
    myDest: "",
    nearby: false,
    count: 0

  }

  componentDidMount() {
    toast.configure();
  }

  showOverview = () => {
    this.setState({display: '', showMenu: false})
  }

  showMenu = () => {
    this.setState({showMenu: true})
  }

  dropMenu = () => {
    this.setState({showMenu: false})
  }

  selectStartTrip = () => {
    this.setState({display: 'startTrip', showMenu: false});

    this.getPassLocationFromDb();
    this.getAllMovingBuses();
    this.nearDriverAlert();

  }

  selEditProfile = () => {
    this.setState({display: 'editProfile', showMenu: false})
  }

  getAllMovingBuses = () => {
    let db = firebase.firestore();
    db.collection("driver").where("startedTrip", "==", true).where("destination", "==", this.state.myDest).onSnapshot(snapshot => {
      let data = [];
      if (!snapshot.empty) {
        snapshot.forEach(doc => {
          const d = {
            email: doc.data().email,
            fullName: doc.data().fullName,
            driverId: doc.id,
            compId: doc.data().compFullName,
            location: doc.data().location,
            busNumplate: doc.data().busNumplate,
            phone: doc.data().phone,
            destination: doc.data().destination,
            distance: getDistance(this.state.currLocation, doc.data().location)
          }

          data.push(d);

        })

      }
      this.setState({
        movingBuses: data
      }, () => {
        db.collection('passenger').doc(this.props.userId).update({"myBuses": this.state.movingBuses});

      });

    })

  }


  nearDriverAlert = () => {
    let db = firebase.firestore();
    db.collection('passenger').doc(this.props.userId).onSnapshot(snapshot=>{
      if (!snapshot.empty) {
        if (snapshot.data().myBuses.length>0) {
          snapshot.data().myBuses.forEach((d) => {
            if (d.distance < 1000 && snapshot.data().startedTrip == true) {

              this.setState({nearby: true, count: this.state.count+1}, ()=>{
                if (this.state.nearby && this.state.count<=1) {
                  toast(d.fullName + " driving bus " + d.busNumplate + " is nearby. Get ready to board", {
                    type: toast.TYPE.INFO,
                    autoClose: 2500
                  });
                }
              });

            }else{
              this.setState({nearby: false})
            }
          });
        } else {
          this.setState({count:0})
        }

      }
    })




  }

  showMap = () => {
    this.setState({display: 'map'});
  }

  stopTracking = () => {
    let db = firebase.firestore();
    this.setState({startedTrip: false, movingBuses: []});

    navigator.geolocation.clearWatch(this.state.geoId);
    db.collection(this.props.userType).doc(this.props.userId).update({startedTrip: false, myBuses:[]}).then(() => {
      toast("We stopped tracking your location", {
        type: toast.TYPE.SUCCESS,
        autoClose: 2500
      });
    })
  }

  selectDest = (e) => {
    e.preventDefault();
    let db = firebase.firestore();
    let myDest = e.target.elements.dest.value;

    if (myDest == "") {
      toast("Please select a destination", {
        type: toast.TYPE.ERROR,
        autoClose: 2500
      });
    } else {

      if (navigator.geolocation) {
        toast("Began tracking your location", {
          type: toast.TYPE.SUCCESS,
          autoClose: 2500
        });
        let GeoId = navigator.geolocation.watchPosition(position => {

          let location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.setState({
            currLocation: location
          }, () => {
            db.collection('passenger').doc(this.props.userId).update({"location": this.state.currLocation, "destination": this.state.myDest, "startedTrip": this.state.startedTrip});

          })
        }, (err) => {
          console.warn('ERROR(' + err.code + '): ' + err.message);
        }, {
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0
        })

        this.setState({
          geoId: GeoId
        }, () => {
          db.collection('passenger').doc(this.props.userId).update({geoId: this.state.geoId});
        })
      } else {
        toast("Geolocation is not supported in your browser", {
          type: toast.TYPE.ERROR,
          autoClose: 2500
        });
      }

      this.setState({
        myDest: myDest,
        startedTrip: true
      }, () => {
        this.getAllMovingBuses();

      })
    }
  }

  getPassLocationFromDb = () => {
    let db = firebase.firestore();
    db.collection("passenger").doc(this.props.userId).get().then(doc => {
      if (!doc.empty) {

        this.setState({
          currLocation: doc.data().location,
          geoId: doc.data().geoId,
          startedTrip: doc.data().startedTrip,
          myDest: doc.data().destination
        }, () => {
          this.getAllMovingBuses()
        });

      }
    })
  }

  handleEditProfile = (e) => {
    e.preventDefault();
    let db = firebase.firestore();
    const fullName = e.target.elements.fullName.value;
    const phoneNum = e.target.elements.phone.value;

    this.setState({
      fullName: fullName != ''
        ? fullName
        : this.props.userName,
      phoneNum: phoneNum != ''
        ? phoneNum
        : this.props.userPhone
    }, () => {
      db.collection(this.props.userType).doc(this.props.userId).update({fullName: this.state.fullName, phone: this.state.phoneNum}).then(() => {
        toast("Success", {
          type: toast.TYPE.SUCCESS,
          autoClose: 2500
        });

      })
    })
    e.target.elements.fullName.value = "";
    e.target.elements.phone.value = "";
  }

  render() {

    const displayView = () => {
      if (this.state.display == 'startTrip') {
        return (<Trip stops={this.state.stops} selectDest={this.selectDest} stopTracking={this.stopTracking} userType={this.props.userType} showMap={this.showMap} startedTrip={this.state.startedTrip} destination={this.state.myDest}/>);
      } else if (this.state.display == 'editProfile') {
        return (<EditProfile handleEditProfile={this.handleEditProfile}/>);
      } else if (this.state.display == 'map') {
        return (<PassMap buses={this.state.movingBuses} currLocation={this.state.currLocation} userType={this.props.userType}/>);
      } else {
        return (<Overview profImg={this.props.profImg} userType={this.props.userType} lastSignedIn={this.props.lastSignedIn} creationTime={this.props.creationTime} userEmail={this.props.userEmail} userPhone={this.props.userPhone}/>)
      }
    }

    return (<Layout>
      <TopNav showMenu={this.showMenu}/>
      <div className="container-fluid">

        {
          this.state.showMenu && <div className="col-md-3">
              <MenuLayout showOverview={this.showOverview} profImg={this.props.profImg} dropMenu={this.dropMenu} userName={this.props.userName} selEditProfile={this.selEditProfile} display={this.state.display} selectStartTrip={this.selectStartTrip} userType={this.props.userType}/>
            </div>
        }

        <div className="row">
          <div className="col-md-12">
            {displayView()}
          </div>
        </div>
        <div></div>

      </div>
    </Layout>)
  }
}

export default withAuth(Passenger)
