import React from 'react';

import PropTypes from 'prop-types';

function EmptyStateComponent({ heroImg, headline, description, linkText, linkHref }) {
  return (
    <section>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="flex flex-col w-full mb-12 text-left lg:text-center">
          <div className="inline-flex items-center justify-center
            flex-shrink-0 w-20 h-20 mx-auto mb-5 text-blue-400 rounded-full bg-gray-50"
          >
            {heroImg}
          </div>
          <h1
            className="max-w-5xl text-5xl font-bold leading-none
            tracking-tighter text-black lg:text-6xl lg:max-w-7xl"
          >
            {headline}
          </h1>
          <p
            className="max-w-xl mx-auto mt-8 text-base
            leading-relaxed text-left text-gray-300 lg:text-center"
          >
            {description}
          </p>
          <a
            href={linkHref}
            className="mx-auto mt-8 text-sm font-semibold text-blue-600 hover:text-black"
          >
            {linkText}
          </a>
        </div>
      </div>
    </section>
  );
}

EmptyStateComponent.propTypes = {
  heroImg: PropTypes.node,
  headline: PropTypes.string,
  description: PropTypes.string,
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
};

export default EmptyStateComponent;
