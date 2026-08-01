import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown, Avatar, message } from 'antd';
import type { MenuProps } from 'antd';
import { User as UserIcon, LogOut, Trophy } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

export const AuthHeader: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  const handleLogout = () => {
    logout();
    message.success('Đã đăng xuất thành công!');
  };

  const dropdownMenuItems: MenuProps['items'] = [
    {
      key: 'user-info',
      label: (
        <div className="px-2 py-1.5 border-b border-gray-100">
          <p className="font-bold text-sm text-[#361e15]">
            {user?.fullName || user?.username || 'Kỳ thủ'}
          </p>
          <p className="text-xs text-gray-500">{user?.email}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-md w-fit">
            <Trophy className="w-3.5 h-3.5" />
            <span>1200 Elo</span>
          </div>
        </div>
      ),
    },
    {
      key: 'logout',
      danger: true,
      icon: <LogOut className="w-4 h-4" />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];

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
        <a href="#features" className="hover:text-[#361e15] transition-colors">
          Learn
        </a>
        <a href="#community" className="hover:text-[#361e15] transition-colors">
          Community
        </a>
      </nav>

      {/* Action Area: Avatar if Logged In vs Sign In / Register if Logged Out */}
      <div className="flex items-center gap-3 text-xs font-semibold">
        {isAuthenticated && user ? (
          <Dropdown menu={{ items: dropdownMenuItems }} placement="bottomRight" arrow>
            <div className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-full hover:bg-[#361e15]/5 transition-all border border-[#361e15]/20 bg-white">
              <Avatar
                style={{ backgroundColor: '#361e15', color: '#ffffff' }}
                icon={<UserIcon className="w-4 h-4" />}
                className="font-bold"
              >
                {(user.fullName || user.username || 'K').charAt(0).toUpperCase()}
              </Avatar>
              <span className="text-xs font-bold text-[#361e15] pr-2 hidden sm:inline-block">
                {user.fullName || user.username}
              </span>
            </div>
          </Dropdown>
        ) : (
          <>
            <Link
              to="/login"
              className={
                isLoginPage
                  ? 'bg-[#361e15] text-white px-5 py-2.5 rounded-lg shadow-sm transition-all'
                  : 'text-[#361e15] hover:bg-[#361e15]/10 px-5 py-2.5 rounded-lg border border-[#361e15]/20 transition-all'
              }
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className={
                isRegisterPage || (!isLoginPage && !isRegisterPage)
                  ? 'bg-[#361e15] text-white px-5 py-2.5 rounded-lg shadow-sm transition-all'
                  : 'text-[#361e15] hover:bg-[#361e15]/10 px-5 py-2.5 rounded-lg border border-[#361e15]/20 transition-all'
              }
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
