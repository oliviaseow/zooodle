import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// Initalize and export Firebase.
const config = {
  apiKey: 'AIzaSyAGkG4tKgnMIYKtZcq6R9FVXDKQOjLUb9s',
  authDomain: 'zoodle2018.firebaseapp.com',
  databaseURL: 'https://zoodle2018.firebaseio.com',
  projectId: 'zoodle2018',
  storageBucket: 'zoodle2018.appspot.com',
  messagingSenderId: '44129510014',
}
export default firebase.initializeApp(config)
