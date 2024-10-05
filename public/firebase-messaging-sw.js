// Import the necessary Firebase scripts for messaging in the service worker
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDwSET4MDtm8j47a806q90yGvfo_m_cnlQ",
  authDomain: "qruil-7672e.firebaseapp.com",
  projectId: "qruil-7672e",
  storageBucket: "qruil-7672e.appspot.com",
  messagingSenderId: "1099009063358",
  appId: "1:1099009063358:web:7fc366b5ac0feed28c21ef",
  measurementId: "G-EQ8MLN3K5M"
};

// Initialize Firebase in the Service Worker
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging in the Service Worker
const messaging = firebase.messaging();

let authToken = null;  // Variable to store the token

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SET_TOKEN') {
    authToken = event.data.token;
  }
});

// Function to check if the user is logged in based on the token
function isUserLoggedIn() {
  // Check if authToken is set and valid
  return authToken !== null;
}

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // if (isUserLoggedIn()) {
    // Customize notification here
    const notificationTitle = payload.notification.title || 'Background Message Title';
    const notificationOptions = {
      body: payload.notification.body || 'Background Message body.',
      icon: '/firebase-logo.png'  // Add your notification icon here
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  // }
});
