import React from 'react'
import router from 'next/router';
import Layout from '../components/Layout'
import MenuLayout from '../components/MenuLayout'
import withAuth from '../lib/helpers/withAuth'
// import Map from '../components/Map'
import {auth, firebase} from '../lib/firebase'
import AddNewBus from '../components/addNewBus'
import ViewBus from '../components/viewBus'
import EditProfile from '../components/editProfile'


class Company extends React.Component{
  state={
    display:'',
    numplate:'',
    busType:'',
    buses:[],
    userType:'',
    fullName: '',
    phoneNum:''
  }

// static getDerivedStateFromProps(nextProps, prevState) {
//   return{
//     userType: nextProps.userType
//   }
// }

  selectAddBus=()=>{
    this.setState({display:'addNew'});

  }
  selectViewBus=()=>{
    this.setState({display:'viewBus'},()=>{
      this.getAllBuses();
    });
  }

  selEditProfile=()=>{
    this.setState({display:'editProfile'})
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

getAllBuses=()=>{
  let db = firebase.firestore();
  db.collection("bus").where('company', '==', this.props.userName).get().then(snapshot=>{
    let data=[];
    if(!snapshot.empty){
      snapshot.forEach(doc => {
        const d={
          numplate : doc.id,
          busType: doc.data().busType,
          driver: doc.data().driver
        }

        data.push(d);
      });
      this.setState({buses: data});
      console.log(this.state.buses);
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
        return(<AddNewBus handleAddBus={this.handleAddBus}/>);
      } else if (this.state.display=='viewBus') {
        return(<ViewBus data={this.state.buses}/>);
      } else if (this.state.display=='editProfile') {
        return(<EditProfile handleEditProfile={this.handleEditProfile}/>);
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
          {}
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                  <MenuLayout display={this.state.display} selectAddBus={this.selectAddBus} selectViewBus={this.selectViewBus} selEditProfile={this.selEditProfile} userType={this.props.userType}/>
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
