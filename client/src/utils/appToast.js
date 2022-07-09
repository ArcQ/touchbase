import toast from 'react-hot-toast';

import { primaryColor, secondaryColor } from 'constants/Colours';

export const toastError = (msg = 'Something went wrong') => {
  toast.error(msg, {
    style: {
      background: primaryColor,
    },
  });
};

export const toastPromise = (promise, messaging) => {
  toast.promise(promise, messaging, {
    style: {
      background: secondaryColor,
      color: '#fff',
    },
  });
};

export const toastSuccess = msg => {
  toast.success(msg, {
    style: {
      background: secondaryColor,
      color: '#fff',
    },
  });
};
