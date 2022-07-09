import axios from 'axios';
import { getAuth } from 'firebase/auth';

import createSingletonService from 'utils/createSingletonService';
import { toastError } from 'services/toastService';
import { getApiErrorMessage } from 'constants/Errors';

import { serviceOptions } from './swagger';

const backendApiClient = createSingletonService({
  start() {
    this.reset();
    const auth = getAuth();
    auth.onAuthStateChanged(() => backendApiClient.reset());
  },
  reset() {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      timeout: 5000,
    });

    const auth = getAuth();

    if (auth?.currentUser) {
      instance.interceptors.request.use(
        async config => {
          config.headers.Authorization = `Token ${await auth.currentUser.getIdToken()}`;
          return config;
        },
        error => Promise.reject(error),
      );

      instance.interceptors.response.use(
        async response => response,
        error => {
          if (!error.message.includes('Request failed with status code 404')) {
            toastError(getApiErrorMessage);
          }
          return Promise.reject(error);
        },
      );
    }

    serviceOptions.axios = instance;
  },
});

export default backendApiClient;
