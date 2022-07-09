import React from 'react';
import NavLink, { NavButton } from './NavLink';

function NavDropdownMenu({ show, user, logout, navLinks }) {
  return (
    <div
      className={`bg-charcoal0 absolute w-48 py-6 px-4 mt-2 origin-top-right rounded-3xl
        z-50 top-[90px] right-[20px] transition ease-in-out duration-200 transform
        block md:hidden
        ${show ? 'opacity-1' : 'opacity-0 pointer-events-none'}`}
    >
      <ul>
        {navLinks.map(link => (
          <li key={link.href} className="mb-3">
            <NavLink href={link.href} text={link.title} />
          </li>
        ))}
        {user ? (
          <li>
            <NavButton onClick={logout}>Sign out</NavButton>
          </li>
        ) : (
          <>
            <li className="mb-3">
              <NavLink href="/auth/signup" text="Sign up" className="text-green" />
            </li>
            <li>
              <NavLink href="/auth/login" text="Log in" />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default NavDropdownMenu;
