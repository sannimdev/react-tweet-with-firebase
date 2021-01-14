import firebase from 'firebase/app';
import 'firebase/auth';
/* 
    Github에 키를 직접 업로드하는 것을 피하고자 env 파일로 별도로 만들어 작성하였음.
    그러나 빌드 시점에서는 결국에는 보일 수밖에 없다.
    단지!!! Github에 업로드하여 키가 노출되는 것을 피하기 위하여 작성함.
*/

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
