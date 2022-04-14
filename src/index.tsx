import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import todostore from './store/todostore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import 'firebase/firestore';
// import 'firebase/auth'
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyD-SAgYLkNB38PEzxPD7md0rDzTyZlHojg",
//   authDomain: "react-talk-76f86.firebaseapp.com",
//   projectId: "react-talk-76f86",
//   storageBucket: "react-talk-76f86.appspot.com",
//   messagingSenderId: "973277192119",
//   appId: "1:973277192119:web:4f0db356ae1b6faa0ed232",
//   measurementId: "G-5YZHH2EER0"
// };
const firebaseConfig = {
  apiKey: "AIzaSyA4mJiAnVVgrBB_-NRTXsmfqZ9z60-QiUA",
  authDomain: "company-affairs.firebaseapp.com",
  projectId: "company-affairs",
  storageBucket: "company-affairs.appspot.com",
  messagingSenderId: "175974537426",
  appId: "1:175974537426:web:0305dfe94db01365d7b50b",
  measurementId: "G-NWXLSS9M24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
todostore.app = initializeApp(firebaseConfig);;
todostore.auth = getAuth(app);
todostore.firestore = getFirestore(app);

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
