import React from 'react'
import router from 'next/router';
import Layout from '../components/Layout'
import MenuLayout from '../components/MenuLayout'
import withAuth from '../lib/helpers/withAuth'
import Map from '../components/Map'
import {auth, firebase} from '../lib/firebase'
import AddNewBus from '../components/addNewBus'
import ViewBus from '../components/viewBus'
import EditProfile from '../components/editProfile'
import AssignDriver from '../components/assignDriver'


class Company extends React.Component{
  state={
    display:'',
    numplate:'',
    busType:'',
    buses:[],
    userType:'',
    fullName: '',
    phoneNum:'',
    drivers:[],
    driverLocation:{}
  }




  selectAddBus=()=>{
    this.setState({display:'addNew'});
    this.getDriverList();
  }
  selectViewBus=()=>{
    this.setState({display:'viewBus'},()=>{
      this.getAllBuses();
    });
  }

  selEditProfile=()=>{
    this.setState({display:'editProfile'})
  }

selAssignDriver=()=>{
  this.setState({display: 'assignDriver'});
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
            destination: doc.data().destination
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
          alert("This number plate already exists");
        }else{
          let busCrendentials={
            busType: this.state.busType,
            company: this.props.userName,
            driver: this.state.driver,
            companyId: this.props.userId
          }

          db.collection('driver').doc(this.state.driver).update({"busNumplate": this.state.numplate}).then(() => {
            alert("Updated your bus number plate");
          });


          db.collection("bus").where('driverId', '==', this.state.driver).get().then(snapshot=>{
                 if (!snapshot.empty) {
                   snapshot.forEach(doc=>{
                     db.collection('bus').doc(doc.id).update({"driver": '', "driverId": ''})
                   })
                 }
               }).then(()=>{
                 db.collection("bus").doc(this.state.numplate).set(busCrendentials).then(()=>{
                    alert("Successfully add a a new bus");
                 })
               })


        }
      })
    }
  )
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
      })
      db.collection('bus').where("companyId","==", this.props.userId).get().then(snapshot=>{
        if(!snapshot.empty){
            snapshot.forEach(doc => {
                db.collection('bus').doc(doc.id).update({company: this.state.fullName})
            })
        }
      }).then(()=>{
      alert("Success");
    })

  })
}

getAllBuses=()=>{
  let db = firebase.firestore();
  db.collection("bus").where('companyId', '==', this.props.userId).get().then(snapshot=>{
    let data=[];
    if(!snapshot.empty){
      snapshot.forEach(doc => {
        const d={
          numplate : doc.id,
          busType: doc.data().busType,
          driver: doc.data().driver,

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
    alert("Updated your bus number plate");
  });

  db.collection("bus").where('driver', '==', driver).get().then(snapshot=>{
         if (!snapshot.empty) {
           snapshot.forEach(doc=>{
             db.collection('bus').doc(doc.id).update({"driver": ''})
           })
         }
       }).then(()=>{
         db.collection('bus').doc(numplate).update({"driver": driver}).then(() => {
           alert("Updated bus information");
         })
       })

}





getCoord=(driverId)=>{
  let db = firebase.firestore();
  db.collection('driver').doc(driverId).onSnapshot(doc=>{
    if (doc.exists) {
      this.setState({driverLocation: doc.data().location, display: 'map'},()=>{
        console.log(this.state.driverLocation);
      })
    }
  })

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
        return(<Map driverLocation={this.state.driverLocation}/>);
      } else if (this.state.display=='assignDriver') {
        return(<AssignDriver drivers={this.state.drivers} buses={this.state.buses} handleAssignDriver={this.handleAssignDriver}/>);
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
                  <MenuLayout userName={this.props.userName} display={this.state.display} selectAddBus={this.selectAddBus} selectViewBus={this.selectViewBus} selEditProfile={this.selEditProfile} selAssignDriver={this.selAssignDriver} userType={this.props.userType} />
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
