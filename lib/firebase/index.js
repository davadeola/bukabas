import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'


  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIRBASE_APP_ID
  };

  if(!firebase.apps.length){
    firebase.initializeApp(config);
  }

  const auth = firebase.auth();
  const storage = firebase.storage();
//  const messaging  = firebase.messaging();
  //messaging.usePublicVapidKey(BPqvH7Sj3Ny9hjD-GI3JQQUKQ-kiSxVE7D6TLeTjL7HlHgd2TSetjZZpGYpoY-SucYv4HZUjF3_y7K3aO4BfeTk);

  export{
    auth, firebase, storage
    // messaging
  };
