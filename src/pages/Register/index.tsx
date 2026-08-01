import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Lock, ShieldCheck, Trophy, Users, Award } from 'lucide-react';
import { message } from 'antd';
import { useRegisterMutation } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';

// Zod validation schema
const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
    email: z.string().min(1, 'Email không được để trống').email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Vui lòng xác nhận lại mật khẩu'),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: 'Bạn phải đồng ý với điều khoản dịch vụ',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không trùng khớp',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const registerMutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    // Generate username from email prefix or fullName if needed
    const username = data.email.split('@')[0] + Math.floor(Math.random() * 1000);

    registerMutation.mutate(
      {
        fullName: data.fullName,
        username,
        email: data.email,
        password: data.password,
        agreeTerms: data.agreeTerms,
      },
      {
        onSuccess: (res) => {
          message.success(res.message || 'Đăng ký tài khoản thành công!');
          if (res.user && res.token) {
            setAuth(res.user, res.token);
          }
          navigate('/login');
        },
        onError: (err: any) => {
          const errorMsg =
            err?.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại sau!';
          message.error(errorMsg);
        },
      }
    );
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row items-center justify-center w-full min-h-[calc(100vh-110px)] px-6 py-8 xiangqi-grid-bg">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Column: Headline & Features */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            Chinh Phục <span className="text-[#b91c1c]">Đấu Trường</span>
            <br />
            Cờ Tướng Đỉnh Cao
          </h1>

          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Tham gia cộng đồng cờ tướng lớn nhất Việt Nam. Trải nghiệm đồ họa tinh xảo, hệ thống xếp hạng chuyên nghiệp và những trận đấu kịch tính.
          </p>

          {/* Feature Badges Row */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-semibold text-gray-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#b91c1c]" />
              <span>Công bằng tuyệt đối</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#b91c1c]" />
              <span>Giải đấu hàng tuần</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#b91c1c]" />
              <span>Cộng đồng sôi nổi</span>
            </div>
          </div>
        </div>

        {/* Right Column: Register Form Card */}
        <div className="md:w-1/2 w-full max-w-md flex flex-col items-center">
          <div className="relative w-full bg-white rounded-2xl p-7 md:p-8 shadow-xl border border-gray-100">
            {/* Top Right Decorative Ribbon Badge */}
            <div className="absolute -top-3 right-6 bg-red-50 border border-red-100 p-2 rounded-xl shadow-xs flex items-center justify-center">
              <Award className="w-5 h-5 text-[#b91c1c]" />
            </div>

            {/* Card Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Đăng ký tài khoản</h2>
              <p className="text-xs text-gray-500 mt-1">Bắt đầu hành trình kỳ thủ của bạn</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Field 1: Full Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    {...register('fullName')}
                    className="w-full bg-white text-gray-800 text-sm rounded-lg pl-10 pr-4 py-2.5 border border-gray-300 focus:border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c] focus:outline-none transition-all"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              {/* Field 2: Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="email@example.com"
                    {...register('email')}
                    className="w-full bg-white text-gray-800 text-sm rounded-lg pl-10 pr-4 py-2.5 border border-gray-300 focus:border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c] focus:outline-none transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Field 3: Password */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register('password')}
                    className="w-full bg-white text-gray-800 text-sm rounded-lg pl-10 pr-4 py-2.5 border border-gray-300 focus:border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c] focus:outline-none transition-all"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Field 4: Confirm Password */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Xác nhận mật khẩu
                </label>
                <div className="relative flex items-center">
                  <ShieldCheck className="absolute left-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register('confirmPassword')}
                    className="w-full bg-white text-gray-800 text-sm rounded-lg pl-10 pr-4 py-2.5 border border-gray-300 focus:border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c] focus:outline-none transition-all"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Agree Terms Checkbox */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 select-none">
                  <input
                    type="checkbox"
                    {...register('agreeTerms')}
                    className="rounded border-gray-300 text-[#b91c1c] focus:ring-[#b91c1c] w-4 h-4"
                  />
                  <span>
                    Tôi đồng ý với các{' '}
                    <a href="#terms" className="text-[#b91c1c] hover:underline font-medium">
                      điều khoản dịch vụ
                    </a>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="mt-1 text-xs text-red-600">{errors.agreeTerms.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full bg-[#b91c1c] hover:bg-[#991b1b] active:bg-[#7f1d1d] text-white font-bold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-70 mt-2"
              >
                {registerMutation.isPending ? 'Đang đăng ký...' : 'Đăng ký ngay'}
              </button>
            </form>
          </div>

          {/* Footer link to Login */}
          <p className="mt-6 text-xs text-gray-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-bold text-[#b91c1c] hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
