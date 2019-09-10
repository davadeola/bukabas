import React from 'react';
import router from 'next/router';
import {auth, firebase} from '../lib/firebase';
import Link from 'next/link';

class Loginbtn extends React.Component {
  state = {
    isLoggedin: false
  }

  componentDidMount() {
    let listener = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoggedIn: true})
        listener();
      } else {
        this.setState({isLoggedIn: false})
        listener();
      }
    })
  }

  handleSignOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(function() {
      router.push('/');

    }).catch(function(error) {
      alert('Oops! There was an error');
      console.log(error.code);
    });
  }

  render() {
    return (<div>
      {
        this.state.isLoggedIn
          ? <button type="submit" className="btn btn-danger" onClick={this.handleSignOut}>Sign out</button>
          : <Link href='/login'>
              <a title='Login page'>
                <button className="btn">Sign in</button>
              </a>
            </Link>

      }
    </div>)
  }
}

export default Loginbtn
