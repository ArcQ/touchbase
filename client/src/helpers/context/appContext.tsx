import { useRouter } from 'next/router';
import { useState, createContext, useContext, useEffect } from 'react';
import { AppUser, MeService } from 'services/swagger';
import { useQuery } from 'react-query';
import { onAuthStateChanged, User } from 'firebase/auth';
import authService from 'services/firebase/authService';

enum UserType {
  'company',
  'user',
}

interface NewCredentials {
  username: string;
  userType: UserType;
}

interface AppContext {
  isAppContextLoading: boolean;
  myUser: AppUser;
  firebaseUser: User;
  newCredentials: NewCredentials;
  isFirstSignup: boolean;
  onNewSignup: (newCredentials: NewCredentials) => void;
  onUserCreated: (newCredentials: NewCredentials) => void;
}

const Context = createContext<AppContext>({
  isAppContextLoading: true,
  myUser: null,
  firebaseUser: null,
  newCredentials: null,
  isFirstSignup: false,
  onNewSignup: null,
  onUserCreated: null,
});

export const AppStateProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User>();
  const [newCredentials, setNewCredentials] = useState<NewCredentials>();
  const [isFirstSignup, setIsFirstSignup] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService.auth, async user => {
      setFirebaseUser(user);
    });
    return unsubscribe;
  }, []);

  const { isLoading: isMyUserLoading, data: myUser } = useQuery(
    'myUser',
    async () => MeService.meUsersRead({ id: 0 }),
    { retry: false, enabled: !!firebaseUser },
  );

  const router = useRouter();

  useEffect(() => {
    if (
      myUser?.isOnboarding &&
      myUser?.userType === 'company' &&
      !router.pathname.includes('onboarding')
    ) {
      router.push('/onboarding/get-started');
    }
  }, [myUser?.isOnboarding]);

  return (
    <Context.Provider
      value={{
        isAppContextLoading: isMyUserLoading,
        myUser,
        firebaseUser,
        isFirstSignup,
        newCredentials,
        onNewSignup: v => {
          setNewCredentials(v);
          setIsFirstSignup(true);
        },
        onUserCreated: () => {
          setNewCredentials(null);
          setIsFirstSignup(false);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};

export function useAppStateContext() {
  return useContext(Context);
}
