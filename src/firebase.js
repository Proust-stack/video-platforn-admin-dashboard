import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyApRpM6xCb3WO98cz3BFxZW79qFHUUqhTg",
    authDomain: "video-platform-a9b33.firebaseapp.com",
    projectId: "video-platform-a9b33",
    storageBucket: "video-platform-a9b33.appspot.com",
    messagingSenderId: "111460749880",
    appId: "1:111460749880:web:90d4d21f8341a862c3cccd"
  };

  firebase.initializeApp(firebaseConfig)
  const storage = firebase.storage()
  export default storage