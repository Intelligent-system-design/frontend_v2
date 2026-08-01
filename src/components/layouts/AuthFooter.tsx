import React from 'react';
import { useLocation } from 'react-router-dom';

export const AuthFooter: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  return (
    <footer className="w-full bg-[#f4f4f5]/60 border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3 z-10">
      <div>© 2026 - The Art of Xiangqi</div>
      <div className="flex items-center gap-6 font-medium">
        {isLoginPage ? (
          <>
            <a href="#rules" className="hover:text-[#b91c1c] transition-colors">
              Quy tắc
            </a>
            <a href="#terms" className="hover:text-[#b91c1c] transition-colors">
              Điều khoản
            </a>
            <a href="#contact" className="hover:text-[#b91c1c] transition-colors">
              Liên hệ
            </a>
          </>
        ) : (
          <>
            <a href="#rules" className="hover:text-[#b91c1c] transition-colors">
              Luật chơi
            </a>
            <a href="#terms" className="hover:text-[#b91c1c] transition-colors">
              Điều khoản
            </a>
            <a href="#privacy" className="hover:text-[#b91c1c] transition-colors">
              Bảo mật
            </a>
            <a href="#support" className="hover:text-[#b91c1c] transition-colors">
              Hỗ trợ
            </a>
          </>
        )}
      </div>
    </footer>
  );
};
