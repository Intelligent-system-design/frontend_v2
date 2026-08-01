import React from 'react';
import { Link } from 'react-router-dom';

export const AuthHeader: React.FC = () => {

  return (
    <header className="w-full bg-[#f7f5f0]/90 backdrop-blur-md border-b border-[#e8e3d9] px-8 py-4 flex items-center justify-between z-30 sticky top-0">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <span className="text-2xl font-serif font-black tracking-tight text-[#361e15] group-hover:text-[#4a2c20] transition-colors">
          Xiangqi Master
        </span>
      </Link>

      {/* Nav Menu */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
        <Link to="/" className="hover:text-[#361e15] transition-colors">
          Play
        </Link>
        <a href="#learn" className="hover:text-[#361e15] transition-colors">
          Learn
        </a>
        <a href="#community" className="hover:text-[#361e15] transition-colors">
          Community
        </a>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 text-xs font-semibold">
        <Link
          to="/login"
          className="text-gray-700 hover:text-[#361e15] px-3 py-2 transition-colors"
        >
          Sign In
        </Link>
        <Link
          to="/register"
          className="bg-[#361e15] hover:bg-[#26140e] text-white px-5 py-2.5 rounded-lg shadow-sm transition-all"
        >
          Register
        </Link>
      </div>
    </header>
  );
};
