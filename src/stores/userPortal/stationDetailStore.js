import { defineStore } from "pinia";
import userPortalAxiosInstance from "@/userPortalAxiosInstance";

export const useStationDetailStore = defineStore("stationDetailStore", {
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
    async get(slug) {
      try {
        let response = await userPortalAxiosInstance.get(`station/${slug}`);

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