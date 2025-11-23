import React from 'react';
import { UserUser } from '../types';
import { Wallet, Zap } from 'lucide-react';

interface NavbarProps {
  user: UserUser;
  onConnect: () => void;
  onHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onConnect, onHome }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onHome}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Nova<span className="text-blue-400">Vote</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400 border border-slate-700">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            Arbitrum Nova Connected
          </div>
          
          <button
            onClick={onConnect}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              user.isConnected
                ? 'bg-slate-800 text-blue-400 ring-1 ring-slate-700'
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20'
            }`}
          >
            <Wallet className="h-4 w-4" />
            {user.isConnected 
              ? `${user.address.slice(0, 6)}...${user.address.slice(-4)}`
              : 'Connect Wallet'
            }
          </button>
        </div>
      </div>
    </nav>
  );
};