import Link from 'next/link';

export default function NotFoundPage() {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <section className="text-blueGray-700 mt-12">
    <div className="container flex flex-col items-center px-5 py-8 mx-auto">
      <div className="flex flex-col w-full mb-12 text-left lg:text-center">
        <h1
          className="mb-8 text-3xl font-semibold tracking-widest text-black
            uppercase title-font text-primary"
        >
          404
        </h1>
        <h1
          className="mx-auto mb-12 text-6xl font-semibold leading-none tracking-tighter
            lg:w-1/2 sm:text-6xl title-font"
        >
          Page not found
        </h1>
        <p className="mx-auto text-base font-medium leading-relaxed text-blueGray-700 lg:w-1/2">
          Please check the URL in the address bar and try again
        </p>
        <div className="mt-10">
          <Link href="/">
            <span className="bg-primary text-white mt-8 p-5 rounded-2xl cursor">
              Go Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  </section>;
}
