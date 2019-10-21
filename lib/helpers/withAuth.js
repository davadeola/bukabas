import React from 'react';
import router from 'next/router';
import {auth, firebase, storage} from '../firebase';
import Loadscreen from '../../components/loadingScreen';
import Layout from '../../components/Layout'

const withAuth = (Component) => {

  return class extends React.Component {
    _isMounted=false;

    constructor(props) {
      super(props);
      this.state = {
        status: 'LOADING',
        userType: '',
        userName: '',
        userId:'',
        email: '',
        profImg:'',
        lastSignedIn:'',
        creationTime:'',
        userPhone:'',
        _reqPath:''
      }
    }

    getProfImage=()=>{
      storage.ref("profile/"+this.state.email).listAll().then((res)=>{
        res.items.forEach((itemRef)=>{
            itemRef.getDownloadURL().then((url)=>{
              if (this._isMounted) {


              this.setState({profImg: url})
            }
            })
        })
      }).catch(err=>{
        console.log(err);
      })

    }

    verifyDbContent = (ref, email, path) => {
      ref.where('email', '==', email).onSnapshot(snapshot => {
        if (!snapshot.empty) {
          if (this._isMounted) {
          this.setState({userType:ref.id, _reqPath:"/"+ref.id},()=>{
            this.confirmUser(path);
          });


          snapshot.forEach(doc => {
            this.setState({
              userName: doc.data().fullName,
              userId: doc.id,
              userPhone: doc.data().phone
            })
          });
          return;
        }
        }

      })
    }

    componentWillUnmount(){
      this._isMounted=false;
    }

    confirmUser(path){
      if (path != this.state._reqPath) {
        router.push(this.state._reqPath)
      }
    }

    checkUserType = (email, path) => {

        let db = firebase.firestore();
        let passenger = db.collection("passenger");
        let driver = db.collection("driver");
        let company = db.collection("company");
        this.verifyDbContent(passenger, email, path);
        this.verifyDbContent(driver, email, path);
        this.verifyDbContent(company, email, path);


    }


    componentDidMount() {
      this._isMounted=true;

      auth.onAuthStateChanged(authUser => {

        if (authUser) {
          if (this._isMounted) {


          this.setState({status: 'SIGNED_IN', email: authUser.email, lastSignedIn: authUser.metadata.lastSignInTime, creationTime: authUser.metadata.creationTime});
        }
        this.checkUserType(authUser.email, this.props.url.pathname);
          this.getProfImage();


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
        return <Component {...this.props} userPhone={this.state.userPhone} lastSignedIn={this.state.lastSignedIn} creationTime={this.state.creationTime} userEmail={this.state.email} userType={this.state.userType} userName={this.state.userName} userId={this.state.userId} profImg={this.state.profImg}/>
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
