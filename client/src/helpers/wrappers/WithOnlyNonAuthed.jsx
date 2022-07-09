import useAuthState from 'helpers/hooks/useAuthState';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function WithOnlyNonAuthed(WrappedComponent) {
  return props => {
    const [user] = useAuthState();
    const router = useRouter();

    useEffect(() => {
      if (user) {
        router.push('/');
      }
    }, [user]);

    return <WrappedComponent {...props} />;
  };
}

export default WithOnlyNonAuthed;
