
import React from 'react';
import { AppScreen } from '../types';
import { FOOTER_TEXT } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  showNav: boolean;
  notificationCount?: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, onNavigate, showNav, notificationCount = 0 }) => {
  return (
    <div className="min-h-screen flex flex-col relative pb-24">
      <main className="flex-1 w-full max-w-md mx-auto relative px-4">
        {children}
      </main>

      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/10 px-4 py-4 flex justify-between items-center z-50">
          <NavItem 
            icon="fa-house-chimney" 
            label="Hub" 
            active={activeScreen === AppScreen.HUB} 
            onClick={() => onNavigate(AppScreen.HUB)} 
            badge={notificationCount > 0}
          />
          <NavItem 
            icon="fa-earth-americas" 
            label="Map" 
            active={activeScreen === AppScreen.MAP} 
            onClick={() => onNavigate(AppScreen.MAP)} 
          />
          <NavItem 
            icon="fa-camera" 
            label="Scanner" 
            active={activeScreen === AppScreen.SCANNER} 
            onClick={() => onNavigate(AppScreen.SCANNER)} 
            special
          />
          <NavItem 
            icon="fa-message-bot" 
            label="Lovel AI" 
            active={activeScreen === AppScreen.CHAT} 
            onClick={() => onNavigate(AppScreen.CHAT)} 
          />
          <NavItem 
            icon="fa-graduation-cap" 
            label="Knowledge" 
            active={activeScreen === AppScreen.LIBRARY} 
            onClick={() => onNavigate(AppScreen.LIBRARY)} 
          />
        </nav>
      )}

      <footer className="w-full text-center py-2 text-[10px] opacity-40 font-light mt-auto">
        {FOOTER_TEXT}
      </footer>
    </div>
  );
};

const NavItem: React.FC<{ 
  icon: string; 
  label: string; 
  active: boolean; 
  onClick: () => void;
  special?: boolean;
  badge?: boolean;
}> = ({ icon, label, active, onClick, special, badge }) => {
  const iconClass = icon === 'fa-message-bot' ? 'fa-solid fa-comment-dots' : `fa-solid ${icon}`;
  
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center transition-all ${
        active ? 'text-red-600' : 'text-white/60 hover:text-white'
      } ${special ? '-mt-10' : ''}`}
    >
      {badge && !special && (
        <div className="absolute top-0 right-1 w-2 h-2 bg-red-600 rounded-full animate-pulse border border-[#1a2e18]"></div>
      )}
      <div className={`${
        special 
          ? 'bg-red-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg accent-glow mb-1' 
          : 'text-xl mb-1'
      }`}>
        <i className={iconClass}></i>
      </div>
      <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
    </button>
  );
};

export default Layout;
