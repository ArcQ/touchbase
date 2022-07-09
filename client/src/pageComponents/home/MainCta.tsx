import tw from 'tailwind-styled-components';

const COMMUNITY_DESCS = ['Inclusive', 'Web3', 'Accessible', 'Positive'];

const StyledButton = tw.div<{ $primary: boolean }>`
  ${p => (p.$primary ? 'bg-indigo-600' : 'bg-indigo-300')} 
  inline-flex px-6 py-2 text-lg text-white border-0 rounded focus:outline-none hover:bg-indigo-600
`;

const Center = tw.div`flex justify-center`;

const TextGradient = tw.span`
text-transparent 
bg-clip-text 
bg-gradient-to-br 
from-pink-400 
to-red-600`;

export default function MainCta() {
  return (
    <section>
      <div className="container flex flex-col items-center justify-center px-5 py-24 mx-auto">
        <div className="w-full h-full text-center lg:w-2/3">
          <h1 className="mb-4 text-4xl font-semibold leading-relaxed text-white sm:text-8xl font-xl title-font">
            Jobs are
            <TextGradient> Boring.</TextGradient>
            <br />
            <span className="block md:mb-5" />
            Find New ways to{' '}
            <TextGradient className="from-indigo-400 to-blue-600">Earn.</TextGradient>
          </h1>
          <p className="mb-8 leading-relaxed">
            Join us and be a part of more sustainable play to earn economy.
          </p>
          <Center>
            <StyledButton $primary>Sign Up</StyledButton>
            <StyledButton $primary>Sign In</StyledButton>
          </Center>
        </div>
      </div>
    </section>
  );
}
