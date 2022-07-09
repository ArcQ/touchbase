import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const styles = {
  navlink: `px-4 py-1 mr-1 text-base text-charcoal5 transition duration-300 ease-in-out 
      transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2
      ring-offset-current ring-offset-2 hover:text-gray-500 cursor-pointer`,
};

const NavLink = ({ href, text, className, isExternal }) =>
  isExternal ? (
    <a href={href}>
      <span className={`${styles.navlink} ${className}`}>{text}</span>
    </a>
  ) : (
    <Link href={href}>
      <a>
        <span className={`${styles.navlink} ${className}`}>{text}</span>
      </a>
    </Link>
  );
export const NavButton = ({ className, children, ...restProps }) => (
  <button className={`${styles.navlink} ${className}`} {...restProps}>
    {children}
  </button>
);

NavLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.node,
  className: PropTypes.string,
};

NavButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default NavLink;
