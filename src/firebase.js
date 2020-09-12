import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var config = {
  apiKey: 'AIzaSyDZSsaBEfV6y4dcwEEDP3M98-2het7QkMI',
  authDomain: 'ultimate-workspace.firebaseapp.com',
  databaseURL: 'https://ultimate-workspace.firebaseio.com',
  projectId: 'ultimate-workspace',
  storageBucket: 'ultimate-workspace.appspot.com',
  messagingSenderId: '121929667679',
}
firebase.initializeApp(config)

export default firebase
