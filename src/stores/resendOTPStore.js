import { defineStore } from "pinia";
import axiosInstance from "@/axiosInstance";

export const useResendOTPStore = defineStore("resendOTPStore", {
  state: () => ({
    response: null,
    error: null,
    errorMessage: null,
    errors: [],
  }),
  getters: {
    getResponse: (state) => state.response,
    getError: (state) => state.error,
    getErrorMessage: (state) => state.errorMessage,
    getErrors: (state) => state.errors,
  },
  actions: {
    async store(otp_token) {
      try {
        let response = await axiosInstance.post(`user-portal/resend-otp`, {
          otp_token: otp_token,
        });

        this.response = response.data ?? null;
        this.error = null;
        this.errorMessage = null;
        this.errors = [];
      } catch (error) {
        this.response = null;
        this.error = error;
        this.errorMessage = error?.response?.data?.message ?? null;
        this.errors = error?.response?.data?.errors ?? null;
      }
    },
  },
});