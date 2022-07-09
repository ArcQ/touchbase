import Link from 'next/link';
import { useQueryClient } from 'react-query';

import { useAppStateContext } from 'helpers/context/appContext';
import ConnectWalletButton from 'components/atoms/ConnectWalletButton';
import NavLink, { NavButton } from 'components/nav/NavLink';
import { logout } from 'services/firebase/authService';
import { Logo } from 'components/Icons';
import NavDropdownMenu from 'components/nav/NavDropdownMenu';

const HamburgerBtn = ({ onClick }) => (
  <svg
    onClick={onClick}
    id="hamburger-btn"
    className="block w-8 h-8 ml-5 dropdown-button md:hidden"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const authNavLinks = [
  {
    title: 'Nfts',
    href: '/nfts',
  },
  {
    title: 'Play',
    href: '/play',
  },
  {
    title: 'Earn',
    href: '/earn',
  },
  {
    title: 'About',
    href: '/about',
  },
];

const noAuthNavLinks = [
  {
    title: 'Nfts',
    href: '/nfts',
  },
  {
    title: 'Play',
    href: '/play',
  },
  {
    title: 'Earn',
    href: '/earn',
  },
  {
    title: 'About',
    href: '/about',
  },
];

const NavComponent = ({ showDropdownMenu, setShowDropdownMenu }) => {
  const queryClient = useQueryClient();
  const { firebaseUser, myUser } = useAppStateContext();
  let links = noAuthNavLinks;
  if (myUser) {
    links = authNavLinks;
  }

  return (
    <div className="relative flex items-center justify-between px-4 py-6 lg:px-12">
      <Link href="/" className="relative focus:outline-none">
        <a>
          <Logo className="" />
        </a>
      </Link>
      <div className="flex items-center">
        <nav className="flex items-center justify-center lg:mr-auto">
          <ul className="items-center hidden list-none md:inline-flex">
            {links.map(link => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  text={link.title}
                  className="whitespace-nowrap"
                  isExternal={undefined}
                />
              </li>
            ))}
          </ul>
        </nav>
        <ConnectWalletButton />
        {firebaseUser ? (
          <>
            <NavButton
              onClick={() => {
                logout();
                queryClient.clear();
              }}
              className="hidden md:block"
            >
              Sign out
            </NavButton>
          </>
        ) : (
          <>
            <NavLink
              href="/auth/login"
              text="Sign in"
              className="hidden ml-1 whitespace-nowrap md:block"
              isExternal={undefined}
            />
          </>
        )}
        <HamburgerBtn onClick={() => setShowDropdownMenu(!showDropdownMenu)} />
      </div>
      <NavDropdownMenu
        show={showDropdownMenu}
        user={firebaseUser}
        logout={logout}
        navLinks={firebaseUser ? authNavLinks : noAuthNavLinks}
      />
    </div>
  );
};

export default NavComponent;
