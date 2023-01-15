// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// // import auth from '@react-native-firebase/auth';

// // GoogleSignin.configure({
// //   webClientId:
// //     BUNDLE_ID === 'com.baffilab.baffiapp'
// //       ? '1035003880596-csnavqt8m69ved67vbigkpv3gnmjqjb5.apps.googleusercontent.com'
// //       : '184194546134-vka45h5g7dacactrobb5a8se528cevlg.apps.googleusercontent.com',
// //   iosClientId:
// //     BUNDLE_ID === 'com.baffilab.baffiapp'
// //       ? '1035003880596-ed6ridauv88gabe62ut9ffqvb9vuucnl.apps.googleusercontent.com'
// //       : '184194546134-9trdr37rnrdinji73ijg41ma1pu4e7i9.apps.googleusercontent.com',
// //   offlineAccess: true,
// // });
// const useGoogle = () => {
//   const googleSignIn = async () => {
//     // Get the users ID token
//     const { idToken } = await GoogleSignin.signIn();
//     // Create a Google credential with the token
//     // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//     // Sign-in the user with the credential
//     // const res = await auth().signInWithCredential(googleCredential);
//     return { ...res, token: idToken };
//   };

//   const googleSignOut = async () => {
//     try {
//       await GoogleSignin.revokeAccess();
//       await GoogleSignin.signOut();
//     } catch (error) {
//       //
//     }
//   };

//   return { googleSignIn, googleSignOut };
// };

// export default useGoogle;
