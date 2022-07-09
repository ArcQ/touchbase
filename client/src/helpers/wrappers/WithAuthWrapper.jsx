import useAuthState from 'helpers/hooks/useAuthState';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function WithAuthWrapper(WrappedComponent) {
  return props => {
    const [user, loading, error] = useAuthState();
    const router = useRouter();
    useEffect(() => {
      if (!user && !loading) {
        router.push('/auth/login');
      }
    }, [user]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen-no-nav">
          <div className="loader mb-14">Initializing User...</div>
        </div>
      );
    }
    if (error) {
      return (
        <div>
          <p>
            Error:
            {error}
          </p>
        </div>
      );
    }
    if (user) {
      return <WrappedComponent {...props} />;
    }
    return <p className="text-center">Not Logged In</p>;
  };
}

export default WithAuthWrapper;
