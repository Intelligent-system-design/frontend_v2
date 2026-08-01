import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const AuthHeader: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <span className="text-2xl font-black tracking-tight text-[#b91c1c] group-hover:text-[#991b1b] transition-colors">
          CỜ TƯỚNG
        </span>
      </Link>

      {/* Top right Navigation link/button */}
      <div>
        {isLoginPage ? (
          <Link
            to="/register"
            className="text-xs font-semibold text-gray-500 hover:text-[#b91c1c] border border-gray-200 hover:border-[#b91c1c] px-4 py-2 rounded-lg transition-all shadow-xs"
          >
            Đăng ký
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-xs font-semibold text-gray-500 hover:text-[#b91c1c] border border-gray-200 hover:border-[#b91c1c] px-4 py-2 rounded-lg transition-all shadow-xs"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
};
