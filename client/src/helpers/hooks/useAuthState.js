import { getAuth } from 'firebase/auth';
import { useEffect, useMemo } from 'react';

import { useAppStateContext } from 'helpers/context/appContext';
import { MeService } from 'services/swagger';

import useLoadingValue from './useLoadingValue';

const useAuthState = () => {
  const auth = getAuth();
  const appContext = useAppStateContext();
  const { error, loading, setError, setValue, value } = useLoadingValue(() => auth.currentUser);

  useEffect(() => {
    const listener = auth.onAuthStateChanged(async user => {
      if (appContext.firstSignup) {
        await MeService.meUsersCreate({
          data: {
            username: appContext.newCredentials.username,
            email: user.email,
            photoUrl: user.photoURL,
            firebaseUid: user.uid,
            providerId: 'EmailAuthProviderID',
            isEmailVerified: user.emailVerified,
            userType: appContext.newCredentials.userType,
          },
        });
        appContext.onUserCreated();
      }
      setValue(user);
    }, setError);

    return () => {
      listener();
    };
  }, [auth]);

  const resArray = [value, loading, error];
  return useMemo(() => resArray, resArray);
};

export default useAuthState;
