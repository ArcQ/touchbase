module.exports = {
  excludes: ['**/test/**', './build/**'],
  sortImports: false,
  danglingCommas: true,
  useRelativePaths: false,
  namedExports: {
    '@storybook/react-native': ['storiesOf'],
    '@web3-react/core': ['useWeb3React'],
    react: [
      'useState',
      'useEffect',
      'useContext',
      'useReducer',
      'useCallback',
      'useMemo',
      'useRef',
      'useImperativeMethods',
      'useLayoutEffect',
    ],
    ['next/router']: ['useRouter'],
    ['react-query']: ['QueryClient', 'QueryClientProvider', 'useQuery'],
    ['react-hook-form']: [
      'useForm',
      'useFormContext',
      'Controller',
      'FormProvider',
      'useController',
    ],
  },
  aliases: {
    Image: 'next/image',
    Link: 'next/link',
    PropTypes: 'third-party-libs/prop-types',
    TestRenderer: 'third-party-libs/react-test-renderer',
    ShallowRenderer: 'third-party-libs/react-test-renderer/shallow',
  },
  moduleNameFormatter({ moduleName, pathToCurrentFile }) {
    if (moduleName.startsWith('src/')) {
      // Add a leading slash to foo imports
      return `${moduleName.split('src/')[1]}`;
    }

    if (moduleName.startsWith('third-party-libs/')) {
      // Add a leading slash to foo imports
      return `${moduleName.split('third-party-libs/')[1]}`;
    }

    // Fall back to the original specifier. It's important that this function
    // always returns a string.
    return moduleName;
  },
};
