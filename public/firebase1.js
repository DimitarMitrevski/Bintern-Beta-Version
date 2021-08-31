var firebaseConfig = {
    apiKey: "<API KEY>",
  authDomain: "<AUTH DOMAIN>",
  databaseURL: "<DATABASE URL>",
  projectId: "<PROJECT ID>",
  storageBucket: "<Storage Bucket>",
  messagingSenderId: "<Meesaging Sender ID>",
  appId: "<AppID>",
  measurementId: "<MesurementID>"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var functions = firebase.functions();