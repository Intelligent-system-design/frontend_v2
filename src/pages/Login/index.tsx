import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Lock } from 'lucide-react';
import { message } from 'antd';
import { useLoginMutation } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import xiangqiBg from '@/assets/images/xiangqi_bg.png';

// Zod validation schema strictly typed
const loginSchema = z.object({
  username: z.string().min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(
      {
        username: data.username,
        password: data.password,
        rememberMe: data.rememberMe,
      },
      {
        onSuccess: (res) => {
          message.success(res.message || 'Đăng nhập thành công!');
          if (res.user && res.token) {
            setAuth(res.user, res.token);
          }
          navigate('/');
        },
        onError: (err: any) => {
          const errorMsg =
            err?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!';
          message.error(errorMsg);
        },
      }
    );
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row w-full min-h-[calc(100vh-110px)]">
      {/* Left Column: Xiangqi Image Banner */}
      <div className="relative md:w-1/2 min-h-[380px] md:min-h-full flex flex-col justify-end p-8 md:p-14 overflow-hidden">
        {/* Background Image */}
        <img
          src={xiangqiBg}
          alt="Bàn cờ tướng"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Overlay for visual hierarchy */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent md:bg-gradient-to-r md:from-white/40 md:via-white/20 md:to-white" />

        {/* Bottom Text Overlay */}
        <div className="relative z-10 max-w-lg mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#b81414] tracking-tight leading-none">
            KỸ TRỊ
            <br />
            THIÊN HẠ
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-700 font-medium leading-relaxed">
            Trải nghiệm đỉnh cao nghệ thuật điều quân và chiến lược quân sự truyền thống trên nền tảng kỹ thuật số hiện đại.
          </p>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Header Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-[#b91c1c] tracking-tight">CỜ TƯỚNG</h2>
            <p className="text-sm font-medium text-gray-600 mt-1">Hệ thống Chiến lược Hoàng gia</p>
          </div>

          {/* Form Card */}
          <div className="w-full bg-white rounded-2xl p-7 md:p-8 shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Field 1: Username */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  TÊN ĐĂNG NHẬP
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nhập tên tài khoản"
                    {...register('username')}
                    className="w-full bg-[#f3f4f6] text-gray-800 text-sm rounded-lg pl-11 pr-4 py-3 border border-transparent focus:border-[#b91c1c] focus:bg-white focus:outline-none transition-all"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>
                )}
              </div>

              {/* Field 2: Password */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  MẬT KHẨU
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register('password')}
                    className="w-full bg-[#f3f4f6] text-gray-800 text-sm rounded-lg pl-11 pr-4 py-3 border border-transparent focus:border-[#b91c1c] focus:bg-white focus:outline-none transition-all"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 select-none">
                  <input
                    type="checkbox"
                    {...register('rememberMe')}
                    className="rounded border-gray-300 text-[#b91c1c] focus:ring-[#b91c1c] w-4 h-4"
                  />
                  <span>Ghi nhớ</span>
                </label>
                <a href="#forgot" className="font-medium text-[#b91c1c] hover:underline">
                  Quên mật khẩu?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-[#b91c1c] hover:bg-[#991b1b] active:bg-[#7f1d1d] text-white font-bold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-70 mt-2"
              >
                {loginMutation.isPending ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>
            </form>
          </div>

          {/* Footer link to Register */}
          <p className="mt-6 text-xs text-gray-600">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-bold text-[#b91c1c] hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
