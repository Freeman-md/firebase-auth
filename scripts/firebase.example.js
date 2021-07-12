// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// make auth and fireStore references
const auth = firebase.auth()
const db = firebase.firestore()

// update firestore settings
db.settings({ timestampsInSnapshots: true })