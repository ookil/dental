import React from 'react';
import { MobileNav } from './Navbar.elements';

type Props = {
  isOpen: boolean;
};

const MobileNavbar: React.FC<Props> = () => {
  const isOpen = false;

  return <MobileNav>h</MobileNav>;
};

export default MobileNavbar;
