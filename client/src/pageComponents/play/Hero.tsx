export default function PlayHero() {
  return (
    <section className="w-full">
      <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
        <div className="flex w-full mx-auto text-left">
          <div className="relative inline-flex items-center mx-auto align-middle">
            <div className="text-center">
              <h1 className="max-w-5xl text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
                The Foldable Park <br className="hidden lg:block" />
              </h1>
              <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">
                We're building a universe of interactions. It's still early. See what we're
                experimenting on testnet.
              </p>
              <div className="flex justify-center w-full max-w-2xl mx-auto mt-6 gap-2">
                <div className="mt-3 rounded-lg sm:mt-0">
                  <button className="items-center block px-5 py-4 text-base font-medium text-center text-white bg-blue-600 transition duration-500 ease-in-out transform lg:px-10 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Get bundle
                  </button>
                </div>
                <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                  <button className="items-center block px-5 lg:px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    See features
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
