const randomStr = (from, length) =>
  Math.random()
    .toString(36)
    .substr(from, length);

const testFormValues = {
  signup: () => ({
    username: randomStr(2, 10),
    email: `eddielaw296+${randomStr(2, 10)}@gmail.com`,
    password: 'Test123*',
    confirmPassword: 'Test123*',
  }),
  login: () => ({
    email: 'eddielaw296@gmail.com',
    password: 'Test123*',
  }),
};

export const getTestFormValues = page =>
  process.env.NEXT_PUBLIC_USE_TEST_FORM_VALUES &&
  process.env.NEXT_PUBLIC_USE_TEST_FORM_VALUES !== 'false' &&
  process.env.NODE_ENV === 'development' &&
  testFormValues[page] &&
  testFormValues[page]();
