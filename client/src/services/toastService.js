import { toast } from 'react-toastify';

const defaultToastConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const toastError = msg => toast.error(msg, defaultToastConfig);

export const toastSuccess = msg => toast.success(msg, defaultToastConfig);

export const toastInfo = msg => toast.info(msg, defaultToastConfig);
