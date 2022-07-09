import Features from 'pageComponents/home/Features';
import MainCta from 'pageComponents/home/MainCta';
import React, { useEffect } from 'react';

export default function Home() {
  const [, setIndex] = React.useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex(index => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <div>
      <MainCta />
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
          <div className="w-5/6 mb-10 lg:max-w-lg lg:w-full md:w-1/2 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://dummyimage.com/720x600"
            />
          </div>
          <div className="flex flex-col items-center text-center lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 md:items-start md:text-left">
            <h1 className="mb-4 text-3xl font-medium text-white title-font sm:text-4xl">
              Origins NFT
              <br className="hidden lg:inline-block" />
              Special Prelaunch Editions
            </h1>
            <p className="mb-8 leading-relaxed">
              The Origins collection is a special prelaunch 721. Everyday for 365 days, 3 more
              Origins NFTs will open up for auction. Our products will be on testnet for a while,
              but we know some of you will be excited to jump in early.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
                Go To Auction
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 flex items-center overflow-hidden bg-white dark:bg-gray-800">
        <div className="container relative flex px-6 py-16 mx-auto">
          <div className="relative z-20 flex flex-col sm:w-2/3 lg:w-2/5">
            <span className="w-20 h-2 mb-12 bg-gray-800 dark:bg-white" />
            <h1 className="flex flex-col mb-5 text-4xl font-black leading-none text-gray-800 uppercase sm:text-8xl dark:text-white">
              Watch Us Build
            </h1>
            <p className="text-sm text-gray-700 sm:text-base dark:text-white">
              Great products are not built with 10 year road maps and unrealizable pie in the sky
              promises. We are flipping the process, building and iterating week by week. Be wowed
              by our velocity, not by our words.
            </p>
            <div className="flex mt-8">
              <a
                href="#"
                className="px-4 py-2 mr-4 text-white uppercase bg-pink-500 border-2 border-transparent rounded-lg text-md hover:bg-pink-400"
              >
                Our Release Log
              </a>
              <a href="#" className="px-4 py-2 mr-4 text-gray-400 text-md hover:text-pink-600">
                Still want to know what we're building?
              </a>
            </div>
          </div>
          <div className="relative hidden sm:block sm:w-1/3 lg:w-3/5">
            <img src="/images/object/10.png" className="max-w-xs m-auto md:max-w-sm" />
          </div>
        </div>
      </section>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col w-full mb-12 text-center">
            <h1 className="mb-4 text-2xl font-medium text-white sm:text-3xl title-font">
              Stay up to date with our releases!
            </h1>
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
              We're building all the time, blink and you might miss out on a mountain of cool
              features 😄
            </p>
          </div>
          <div className="flex flex-col items-end w-full px-8 mx-auto lg:w-2/3 sm:flex-row sm:px-0 sm:space-x-4 sm:space-y-0 space-y-4">
            <div className="relative flex-grow w-full sm:mb-0">
              <label htmlFor="email" className="text-sm text-gray-400 leading-7">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-1 text-base text-gray-100 bg-gray-800 border border-gray-700 rounded outline-none bg-opacity-40 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="px-8 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
              Subscribe
            </button>
          </div>
        </div>
      </section>
      <Features />
    </div>
  );
}
