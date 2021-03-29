import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCjrSLzxC4UGgqF9-nnqF1soojtDhubAyo",
  authDomain: "whatsapp-mern-fb135.firebaseapp.com",
  databaseURL: "https://whatsapp-mern-fb135.firebaseio.com",
  projectId: "whatsapp-mern-fb135",
  storageBucket: "whatsapp-mern-fb135.appspot.com",
  messagingSenderId: "511473333478",
  appId: "1:511473333478:web:5fee5f40498ff832557727"
};

const firebaseapp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth , provider}