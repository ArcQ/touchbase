import { initializeApp } from 'firebase/app';

import createSingletonService from 'utils/createSingletonService';
import { firebaseConfig } from 'config/firebaseApp';

export const firebaseService = createSingletonService({
  start() {
    this.app = initializeApp(firebaseConfig);
    this.isInit = true;
  },
  app: undefined,
});

export default firebaseService;
