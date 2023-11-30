import { initializeApp } from 'firebase/app'
const firebaseConfig = {
  apiKey: 'AIzaSyDjY-CR4HO8Ev1zuaHTPU7w12UlVaEn8O4',
  authDomain: 'hal-cinema-db.firebaseapp.com',
  projectId: 'hal-cinema-db',
  storageBucket: 'hal-cinema-db.appspot.com',
  messagingSenderId: '775944880604',
  appId: '1:775944880604:web:31e2e22953511bb1f9cf19',
  measurementId: 'G-44EF44WLBQ'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
