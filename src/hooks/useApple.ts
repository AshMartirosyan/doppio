import {appleAuth} from '@invertase/react-native-apple-authentication';

const useApple = () => {
  const appleSignIn = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    // const appleCredential = auth.AppleAuthProvider.credential(
    //   identityToken,
    //   nonce,
    // );

    // Sign the user in with the credential
    // const res = await auth().signInWithCredential(appleCredential);
    return {...res, token: identityToken};
  };

  return {appleSignIn, isSupported: appleAuth.isSupported};
};

export default useApple;
