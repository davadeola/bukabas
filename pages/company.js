import React from 'react'
import router from 'next/router';
import Layout from '../components/Layout'
import MenuLayout from '../components/MenuLayout'
import withAuth from '../lib/helpers/withAuth'
import Map from '../components/Map'
import {auth, firebase, storage} from '../lib/firebase'
import { toast } from 'react-toastify';

import AddNewBus from '../components/addNewBus'
import ViewBus from '../components/viewBus'
import EditProfile from '../components/editProfile'
import AssignDriver from '../components/assignDriver'
import Overview from '../components/overview'
import TopNav from '../components/topNav'


class Company extends React.Component{


  state={
    showMenu:false,
    display:'',
    numplate:'',
    busType:'',
    buses:[],
    userType:'',
    fullName: '',
    phoneNum:'',
    drivers:[],
    driverLocation:{},
    destination:'',
    driver:''
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



  selectAddBus=()=>{
    this.setState({display:'addNew', showMenu: false});
    this.getDriverList();

  }
  selectViewBus=()=>{
    this.setState({display:'viewBus', showMenu: false},()=>{
      this.getAllBuses();
    });
  }

  selEditProfile=()=>{
    this.setState({display:'editProfile', showMenu: false})
  }

selAssignDriver=()=>{
  this.setState({display: 'assignDriver', showMenu: false});
  this.getAllBuses();
  this.getDriverList();
}

  getDriverList = () => {
    let db = firebase.firestore();
    db.collection("driver").where("compFullName", "==", this.props.userId).onSnapshot(snapshot => {
      let data = [];
      if (!snapshot.empty) {
        snapshot.forEach(doc => {
          const d = {
            email: doc.data().email,
            fullName: doc.data().fullName,
            driverId: doc.id,
            location: doc.data().location,
            busNumplate: doc.data().busNumplate,
            phone: doc.data().phone,
            destination: doc.data().destination,
            startedTrip: doc.data().startedTrip
          }

          data.push(d);
        })

      }
      this.setState({drivers: data});

    })

  }


handleAddBus=(e)=>{
    e.preventDefault();
    const userType = this.props.userType;

    this.setState({
      numplate: e.target.elements.numplate.value,
      busType: e.target.elements.busType.value,
      driver: e.target.elements.driver.value
    },()=>{
      let db = firebase.firestore();
      db.collection("bus").doc(this.state.numplate).get()
      .then(doc=>{
        if (doc.exists) {
          toast("This number plate already exists", {type: toast.TYPE.ERROR, autoClose: 2500})

        }else{
          let busCrendentials={
            busType: this.state.busType,
            company: this.props.userName,
            driver: this.state.driver,
            companyId: this.props.userId
          }

          db.collection('driver').doc(this.state.driver).update({"busNumplate": this.state.numplate}).then(() => {
            toast("Updated your bus number plate", {type: toast.TYPE.SUCCESS, autoclose: 2500})

          });


          db.collection("bus").where('driver', '==', this.state.driver).get().then(snapshot=>{
                 if (!snapshot.empty) {
                   snapshot.forEach(doc=>{
                     db.collection('bus').doc(doc.id).update({"driver": '', "driverId": ''})
                   })
                 }
               }).then(()=>{
                 db.collection("bus").doc(this.state.numplate).set(busCrendentials).then(()=>{
                   toast("Successfully added", {type: toast.TYPE.SUCCESS, autoclose: 2500})


                 })
               })


        }
      })
    })
  }

handleEditProfile=(e)=>{
  e.preventDefault();
  let db = firebase.firestore();
  const fullName = e.target.elements.fullName.value;
  const phoneNum = e.target.elements.phone.value;
  this.setState({
    fullName:fullName != ''
      ? fullName
      : this.props.userName,
    phoneNum:phoneNum != ''
      ? phoneNum
      : this.props.userPhone
  }, ()=>{
    db.collection(this.props.userType).doc(this.props.userId).update(
      {
        fullName: this.state.fullName,
        phone:this.state.phoneNum
      })
      db.collection('bus').where("companyId","==", this.props.userId).get().then(snapshot=>{
        if(!snapshot.empty){
            snapshot.forEach(doc => {
                db.collection('bus').doc(doc.id).update({company: this.state.fullName})
            })
        }
      }).then(()=>{
        toast("Success", {type: toast.TYPE.SUCCESS, autoclose: 2500})


    })

  })
  e.target.elements.fullName.value = "";
  e.target.elements.phone.value = "";
}

getAllBuses=()=>{
  let db = firebase.firestore();
  db.collection("bus").where('companyId', '==', this.props.userId).onSnapshot(snapshot=>{
    let data=[];
    if(!snapshot.empty){
      snapshot.forEach(doc => {
        const d={
          numplate : doc.id,
          busType: doc.data().busType,
          driver: doc.data().driver,
          startedTrip: doc.data().startedTrip,
        }

        data.push(d);
      });
      this.setState({buses: data});
    }
  })
}


handleAssignDriver=(e)=>{
  let db = firebase.firestore();
  e.preventDefault();
  const driver=e.target.elements.driver.value;
  const numplate = e.target.elements.bus.value;



  db.collection('driver').doc(driver).update({"busNumplate": numplate}).then(() => {
    toast("Updated your bus number plate", {type: toast.TYPE.SUCCESS, autoclose: 2500})

  });

  db.collection("bus").where('driver', '==', driver).get().then(snapshot=>{
         if (!snapshot.empty) {
           snapshot.forEach(doc=>{
             db.collection('bus').doc(doc.id).update({"driver": ''})
           })
         }
       }).then(()=>{
         db.collection('bus').doc(numplate).update({"driver": driver}).then(() => {
           toast("Updated your bus information", {type: toast.TYPE.SUCCESS, autoclose: 2500})


         })
       })

}





getCoord=(driverId)=>{
  if(driverId){


  let db = firebase.firestore();
  db.collection('driver').doc(driverId).onSnapshot(doc=>{
    if (doc.exists) {
      this.setState(
        {
        driverLocation: doc.data().location,
        display: 'map',
        fullName: doc.data().fullName,
        numplate: doc.data().busNumplate,
        destination: doc.data().destination,
        phoneNum: doc.data().phone
      })
    }
  })
}else{
  toast("Assign a driver to this bus", {type: toast.TYPE.WARNING, autoclose: 2500})

}
}


  render(){
    // if(this.props.userType != 'company'){
    //   alert("You are not allowed to view this page");
    //   router.push("/")
    // }



    const displayView=()=>{
      if (this.state.display=='addNew') {
        return(<AddNewBus handleAddBus={this.handleAddBus} drivers={this.state.drivers}/>);
      } else if (this.state.display=='viewBus') {
        return(<ViewBus data={this.state.buses} getCoord={this.getCoord}/>);
      } else if (this.state.display=='editProfile') {
        return(<EditProfile handleEditProfile={this.handleEditProfile}/>);
      } else if (this.state.display=='map') {
        return(<Map driverLocation={this.state.driverLocation} fullName={this.state.fullName} phone={this.state.phoneNum} busNumplate={this.state.numplate} destination={this.state.destination}/>);
      } else if (this.state.display=='assignDriver') {
        return(<AssignDriver drivers={this.state.drivers} buses={this.state.buses} handleAssignDriver={this.handleAssignDriver}/>);
      } else {
        return(
          <Overview profImg={this.props.profImg} userType={this.props.userType} lastSignedIn={this.props.lastSignedIn} creationTime={this.props.creationTime} userEmail={this.props.userEmail} userPhone={this.props.userPhone}/>
        )
      }
    }
    return(

        <Layout>

          <TopNav showMenu={this.showMenu}/>
          <div className="container-fluid">
              {this.state.showMenu &&   <div className="col-md-3">
                    <MenuLayout showOverview={this.showOverview} profImg={this.props.profImg} dropMenu={this.dropMenu} userName={this.props.userName} display={this.state.display} selectAddBus={this.selectAddBus} selectViewBus={this.selectViewBus} selEditProfile={this.selEditProfile} selAssignDriver={this.selAssignDriver} userType={this.props.userType} />
                </div>
              }
            <div className="row">
              <div className="col-md-12">
                {displayView()}
              </div>
            </div>

          </div>

      </Layout>
    );
  }

}

export default withAuth(Company)
