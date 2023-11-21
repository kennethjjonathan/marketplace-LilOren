import axiosInstance from '@/lib/axiosInstance';

interface RequestResetPasswordRequestPayload {
  email: string;
}

export const authClient = {
  async requestResetPassword(payload: RequestResetPasswordRequestPayload) {
    return await axiosInstance({
      method: 'POST',
      url: '/auth/reset-password/request',
      data: payload,
    });
  },
};
