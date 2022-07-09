import tw from 'tailwind-styled-components';

const getButtonStyles = (color?: string) => {
  switch (color) {
    case 'primary':
      return 'bg-blue-600 text-white';
    case 'secondary':
      return 'bg-pink-600 text-white';
    default:
      return 'bg-blue-600 text-white';
  }
};

const ButtonPrimary = tw.div<{ $color?: string }>`
  ${p => getButtonStyles(p.$color)} 
  inline-flex px-6 py-2 text-lg text-white border-0 rounded focus:outline-none hover:bg-indigo-600
  rounded-full transition ease-in-out duration-500 transform
  hover:scale-105 px-4 py-2 font-medium transition duration-500
  ease-in-out transform focus:shadow-outline focus:outline-none
  focus:ring-2 ring-offset-current ring-offset-2 cursor-pointer
`;

export default ButtonPrimary;
