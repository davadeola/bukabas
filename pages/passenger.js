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
    phoneNum:'',
    movingBuses:[],
    myBuses:[],
    currLocation:{},
    geoId:''
  }

  selectStartTrip=()=>{
    this.setState({display:'startTrip'});
    console.log(this.props.userType);
    this.getAllMovingBuses();
  }

  selEditProfile=()=>{
    this.setState({display:'editProfile'})
  }

  getAllMovingBuses=()=>{
    let db = firebase.firestore();
    db.collection("driver").where("startedTrip", "==", true).onSnapshot(snapshot => {
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
            destination: doc.data().destination
          }

          data.push(d);
        })

      }
      this.setState({movingBuses: data});

    })

  }

  selectDest=(e)=>{
    e.preventDefault();
    let db = firebase.firestore();
    let myDest = e.target.elements.dest.value;
    let myBuses = this.state.movingBuses.filter((bus)=>{
      return bus.destination == myDest;
    })
    this.setState({myBuses: myBuses});


    if (navigator.geolocation) {
      let GeoId = navigator.geolocation.watchPosition(position => {
        let location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({geoId: GeoId, currLocation: location},()=>{
          db.collection('passenger').doc(this.props.userId).update({"location": this.state.currLocation, "destination":myDest, "geoId": this.state.geoId}).then(() => {
            console.log(this.state.currLocation +". Updated your location");
          })
        });

      }, (err) => {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      },{
        enableHighAccuracy: false,
        timeout: 1000,
        maximumAge: 0
      })

    } else {
      alert("Geolocation is not supported in your browser");
    }
  }


  getPassLocation=()=>{

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
    e.target.elements.fullName.value="";
    e.target.elements.phone.value="";
  }

    render(){

      const displayView=()=>{
        if (this.state.display=='startTrip') {
          return(<Trip selectDest={this.selectDest} userType={this.props.userType}/>);
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
                    <MenuLayout userName={this.props.userName} selEditProfile={this.selEditProfile} display={this.state.display} selectStartTrip={this.selectStartTrip}  userType={this.props.userType} />
                </div>
                <div className="col-md-9">
                  {displayView()}
                </div>
              </div>
              <div>

              </div>

            </div>
        </Layout>
        )
    }
}

export default withAuth(Passenger)
