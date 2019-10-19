import React from 'react'
import Link from 'next/link'
import Loginbtn from './loginbtn'
import {auth, firebase} from '../lib/firebase';
import router from 'next/router';
import DashButton from './dashButton'



class Nav extends React.Component{

  state = {
    isLoggedin: false,
    userType:''
  }

  componentDidMount() {
    let listener = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoggedIn: true})
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
        this.setState({userType:ref.id},()=>{
          console.log(this.state.userType);

        });

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


  handleSignOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(()=>{
      this.setState({isLoggedIn: false});
      router.push('/');

    }).catch(function(error) {
      alert('Oops! There was an error');
      console.log(error);
    });
  }

  render(){
    return (
      <div>
        <nav className="navbar navbar-light bg-light fixed-bottom">
          <Link href='/'>
            <a title="Home">
              <button className="btn btn-default nav-disp text-center"><img src="/static/images/home-icon.png" className="nav-icon"/>Home</button>
            </a>
          </Link>
          {this.state.isLoggedIn ? <DashButton link={this.state.userType}/> : <Link href='/signup'>
            <a title="Sign up">
              <button className="btn btn-default nav-disp text-center"><img src="/static/images/new-account.png" className="nav-icon"/>Sign up</button>
            </a>
          </Link>}
          <Loginbtn isLoggedIn={this.state.isLoggedIn} handleSignOut={this.handleSignOut}/>
        </nav>
    </div>
    )

  }
}
export default Nav
