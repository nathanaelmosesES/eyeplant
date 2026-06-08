import React from 'react';
import { Home, MessageCircle, Sprout, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/home', icon: Home },
  { label: 'Chat', path: '/chat', icon: MessageCircle },
  { label: 'Status', path: '/plant-status', icon: Sprout },
  { label: 'Profile', path: '/profile', icon: User },
];

const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {navItems.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
