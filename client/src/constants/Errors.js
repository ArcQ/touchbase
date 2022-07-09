const formErrorDict = {
  required: 'This field is required.',
  minLength: 'This field is too short.',
  maxLength: 'This field is too long.',
};

export const getFormErrorMessage = error => {
  if (error.message) return error.message;
  return formErrorDict[error.type] || 'There was something wrong with this field';
};

const apiErrorDict = {
  '400_ErrorCode': '',
};

export const getApiErrorMessage = error => {
  const k = `${error?.status}_${error?.data?.code}`;
  return apiErrorDict[k] || 'Something went wrong';
};
