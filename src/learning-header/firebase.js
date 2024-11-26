/*-----------------------------------------------------------------------------
 written by: Lawrence McDaniel - https://lawrencemcdaniel.com
 date: nov-2024
 usage: This script is loaded by the LearningHeader component of the edx-platform. 
        It is responsible for authenticating to the Firebase messaging service.
-----------------------------------------------------------------------------*/
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
require('firebase/messaging');

import { getFirebaseConfig } from './utils';


const firebaseConfig = getFirebaseConfig();
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Request permission to receive notifications
messaging.requestPermission()
  .then(() => {
    console.log('Notification permission granted.');
    return messaging.getToken();
  })
  .then(token => {
    // Hook for doing something with the resulting token
    console.log('FCM Token:', token);
  })
  .catch(err => {
    console.error('Unable to get permission to notify.', err);
  });

export { messaging };
