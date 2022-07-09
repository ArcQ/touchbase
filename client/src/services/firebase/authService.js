import {
  OperationType,
  getAuth,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';

import backendApiClient from 'services/backendApiClient';
import { MeService } from 'services/swagger';
import { toastError, toastSuccess } from 'services/toastService';
import { UsersService } from '../swagger';

const provider = new GoogleAuthProvider();

export const AuthType = {
  EMAIL_AND_PASSWORD: 'EMAIL_AND_PASSWORD',
  PHONE: 'PHONE',
  GOOGLE_SIGN_IN: 'GOOGLE_SIGN_IN',
};

const authService = {
  auth: undefined,
  init() {
    this.auth = getAuth();
  },
};

export const firebaseDelegate = {
  createUserWithEmailAndPassword: async firebaseCredentials => {
    const emailCredentials = await createUserWithEmailAndPassword(
      authService.auth,
      firebaseCredentials.email,
      firebaseCredentials.password,
    );
    const { user } = emailCredentials;
    await MeService.meUsersCreate({
      data: {
        username: firebaseCredentials.username,
        email: user.email,
        photoUrl: user.photoURL,
        firebaseUid: user.uid,
        providerId: 'EmailAuthProviderID',
        isEmailVerified: user.emailVerified,
        userType: firebaseCredentials.userType,
      },
    });
    if (emailCredentials.operationType === OperationType.SIGN_IN) {
      backendApiClient.reset();
      // const response = await UsersService.usersCreate({
      //   data: {
      //     username: firebaseCredentials.username,
      //     email: user.email,
      //     photo_url: user.photoURL,
      //     firebase_uid: user.uid,
      //     provider_id: user.providerData[0].providerId,
      //     is_email_verified: user.emailVerified,
      //   },
      // });
      return {
        username: firebaseCredentials.username,
        email: user.email,
        photo_url: user.photoURL,
        firebase_uid: user.uid,
        provider_id: user.providerData[0].providerId,
        is_email_verified: user.emailVerified,
      };
    }
  },
  sendEmailVerification: async () => {
    try {
      await sendEmailVerification(authService.auth.currentUser);
      toastSuccess('Success! A verification link has been sent to your email');
    } catch {
      toastError('Sorry, something went wrong');
    }
  },
  signInWithPhoneNumber: async firebaseCredentials => {
    const appVerifier = firebaseCredentials.recaptchaVerifier;
    return signInWithPhoneNumber(authService.auth, firebaseCredentials.phoneNumber, appVerifier);
  },
};

export async function signup(authType, firebaseCredentials) {
  // TODO should check username doesn't exist again
  switch (authType) {
    case AuthType.EMAIL_AND_PASSWORD:
      const user = await firebaseDelegate.createUserWithEmailAndPassword(firebaseCredentials);
      firebaseDelegate.sendEmailVerification();
      return;
    case AuthType.PHONE:
      return firebaseDelegate.signInWithPhoneNumber(firebaseCredentials);
    case AuthType.GOOGLE_SIGN_IN:
    default:
  }
}

export async function signupWithPhoneConfirmationCode(confirmationResult, verificationCode) {
  const userCredential = confirmationResult.confirm(verificationCode);
  const { user } = userCredential;
  return MeService.meUsersCreate({
    data: {
      username: undefined,
      email: user.email,
      photo_url: user.photoURL,
      firebase_uid: user.uid,
      provider_id: user.providerData[0].providerId,
      is_email_verified: user.emailVerified,
    },
  });
}

export async function loginWithPhoneConfirmationCode(confirmationResult, verificationCode) {
  return confirmationResult.confirm(verificationCode);
}

export async function login(authType, firebaseCredentials) {
  switch (authType) {
    case AuthType.EMAIL_AND_PASSWORD:
      return signInWithEmailAndPassword(
        authService.auth,
        firebaseCredentials.email,
        firebaseCredentials.password,
      );
    case AuthType.PHONE:
      return signInWithPhoneNumber(
        authService.auth,
        firebaseCredentials.phoneNumber,
        firebaseCredentials.recaptchaVerifier,
      );
    case AuthType.GOOGLE_SIGN_IN:
    default:
  }
}

export async function checkUsernameExists(username) {
  if (!username) return false;
  const response = await UsersService.usersList({ username });
  return response.count === 0;
}

export async function logout() {
  return signOut(authService.auth);
}

export default authService;
