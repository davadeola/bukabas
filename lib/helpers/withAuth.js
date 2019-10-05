import React from 'react';
import router from 'next/router';
import {auth, firebase} from '../firebase';
import Loadscreen from '../../components/loadingScreen';
import Layout from '../../components/Layout'

const withAuth = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        status: 'LOADING',
        userType: '',
        userName: '',
        userId:''
      }
    }

    verifyDbContent = (ref, email) => {
      ref.where('email', '==', email).onSnapshot(snapshot => {
        if (!snapshot.empty) {
          this.setState({userType:ref.id});

          snapshot.forEach(doc => {
            this.setState({
              userName: doc.data().fullName,
              userId: doc.id
            })
          });
          return;
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


    componentDidMount() {
      auth.onAuthStateChanged(authUser => {

        if (authUser) {
          this.setState({status: 'SIGNED_IN'});
          this.checkUserType(authUser.email);
        } else {
          router.push('/');
        }
      });
    }

    renderContent() {
      const {status} = this.state;



      if (status == 'LOADING') {
        return (
        <Layout>
          <Loadscreen/>
      </Layout>);
      } else if (status == 'SIGNED_IN') {
        return <Component {...this.props} userType={this.state.userType} userName={this.state.userName} userId={this.state.userId}/>
      }
    }
    render() {
      return (<React.Fragment>
        {this.renderContent()}
      </React.Fragment>);
    }
  };
}
export default withAuth;
