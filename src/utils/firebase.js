import { initializeApp } from "firebase/app";


const apiUrl = import.meta.env.VITE_APP_API_KEY;


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiUrl,
  authDomain: "billingapp-97be5.firebaseapp.com",
  projectId: "billingapp-97be5",
  storageBucket: "billingapp-97be5.appspot.com",
  messagingSenderId: "313252897538",
  appId: "1:313252897538:web:d828dd6e3b2b1ae54a981b"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
