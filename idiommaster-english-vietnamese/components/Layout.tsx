
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, LayoutDashboard, BrainCircuit } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Home' },
    { path: '/quiz', icon: <BrainCircuit className="w-5 h-5" />, label: 'Quiz' },
    { path: '/library', icon: <Book className="w-5 h-5" />, label: 'Library' },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0 md:pl-20">
      {/* Sidebar / Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-2 flex justify-around items-center z-50 md:top-0 md:left-0 md:w-20 md:h-full md:flex-col md:border-t-0 md:border-r md:p-4">
        <div className="hidden md:block mb-8">
           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">IM</div>
        </div>
        
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
