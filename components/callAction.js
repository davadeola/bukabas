import React from 'react'
import Link from 'next/link'
import {auth, firebase} from '../lib/firebase';
import router from 'next/router';




class CallAction extends React.Component{

  state = {
    isLoggedin: false,
    userType:''
  }

  componentDidMount() {
    let listener = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoggedIn: true});
        this.checkUserType(user.email);
        listener();
      } else {
        this.setState({isLoggedIn: false})
        listener();
      }
    })

  }


  verifyDbContent = (ref, email) => {
    ref.where('email', '==', email).onSnapshot(snapshot => {
      if (!snapshot.empty) {
        this.setState({userType:ref.id});
      }

    })
  }

  checkUserType = (email) => {

      let db = firebase.firestore();
      let passenger = db.collection("passenger");
      let driver = db.collection("driver");
      let company = db.collection("company");
      this.verifyDbContent(passenger, email);
      this.verifyDbContent(driver, email);
      this.verifyDbContent(company, email);


  }





  render(){
    return (
      <div className='btn-row'>
        {this.state.isLoggedIn ?
          <Link href={'/'+this.state.userType}>
            <a title='Dashboard'><button className="btn">My Dashboard</button></a>
          </Link>
          :
          <Link href='/signup'>
            <a title='Sign up page'><button className="btn">Get started</button></a>
          </Link>
        }

      </div>
    )

  }
}
export default CallAction
