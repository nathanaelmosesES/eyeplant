import React from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showStatusBar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showStatusBar = true }) => {
  return (
    <div className="mobile-container">
      {showStatusBar && (
        <div className="status-bar">
          <span>9:41</span>
          <div className="icons">
            <Signal size={16} />
            <Wifi size={16} />
            <Battery size={16} />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Layout;
