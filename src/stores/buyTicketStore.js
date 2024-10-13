import { defineStore } from "pinia";
import axiosInstance from "@/axiosInstance";

export const useBuyTicketStore = defineStore("buyTicketStore", {
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
    async store(type, origin_station_slug, destination_station_slug) {
      try {
        let response = await axiosInstance.post(`user-portal/buy-ticket`, {
          type: type,
          origin_station_slug: origin_station_slug,
          destination_station_slug: destination_station_slug,
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
