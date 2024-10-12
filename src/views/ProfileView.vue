<template>
  <van-nav-bar title="Profile" :fixed="true" />

  <div class="pt-[46px]"></div>

  <van-pull-refresh
    v-model="refreshing"
    pulling-text="Pull to refresh"
    loosing-text="Pull to refresh"
    loading-text="Loading"
    success-text="Successfully loaded"
    @refresh="onRefresh"
  >
    <div
      v-if="!isAuthenticated"
      class="bg-theme rounded-b-lg shadow-sm p-3 flex justify-start items-center"
    >
      <img
        src="@/assets/image/user.png"
        alt=""
        class="w-14 h-14 p-1 bg-gray-100 rounded-lg"
      />
      <div class="ml-3">
        <van-button
          icon="contact-o"
          type="default"
          plain
          size="small"
          class="rounded-lg border-none"
          to="/login"
          >Create Account or Login</van-button
        >
      </div>
    </div>

    <div
      v-if="profile != null"
      class="bg-theme rounded-b-lg shadow-sm p-3 flex justify-start items-center"
    >
      <img
        src="@/assets/image/user.png"
        alt=""
        class="w-14 h-14 p-1 bg-gray-100 rounded-lg"
      />
      <div class="ml-3">
        <h6 class="text-sm text-white">{{ profile.name }}</h6>
        <p class="text-sm text-white">{{ profile.email }}</p>
        <span
          class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
          >{{ profile.wallet_balance }}</span
        >
      </div>
    </div>

    <div class="p-3">
      <van-cell-group inset class="mb-3 mx-0">
        <van-cell is-link to="/change-password">
          <template #title>
            <div class="flex items-center">
              <van-icon name="shield-o" class="text-lg mr-1" />
              <span>Change Password</span>
            </div>
          </template>
        </van-cell>

        <van-cell is-link to="/ticket">
          <template #title>
            <div class="flex items-center">
              <van-icon name="coupon-o" class="text-lg mr-1" />
              <span>Ticket</span>
            </div>
          </template>
        </van-cell>

        <van-cell is-link to="/top-up-history">
          <template #title>
            <div class="flex items-center">
              <van-icon name="list-switch" class="text-lg mr-1" />
              <span>Top Up History</span>
            </div>
          </template>
        </van-cell>

        <van-cell is-link to="/wallet-transaction">
          <template #title>
            <div class="flex items-center">
              <van-icon name="paid" class="text-lg mr-1" />
              <span>Wallet Transaction</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <div v-if="profile != null">
        <van-button
          type="default"
          plain
          block
          class="rounded-lg border-none"
          loading-text="Loading..."
          :loading="logoutBtnLoading"
          @click="onLogout"
          >Logout</van-button
        >
      </div>
    </div>
  </van-pull-refresh>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useGeneralStore } from "@/stores/generalStore";
import { useProfileStore } from "@/stores/profileStore";
import { useLogoutStore } from "@/stores/logoutStore";
import { showSuccessToast } from "vant";
import { showConfirmDialog } from "vant";

const router = useRouter();
const route = useRoute();
const generalStore = useGeneralStore();
const profileStore = useProfileStore();
const logoutStore = useLogoutStore();
const profile = ref(null);
const isAuthenticated = generalStore.getIsAuthenticated;
const refreshing = ref(false);
const logoutBtnLoading = ref(false);

const fetchProfile = async () => {
  await profileStore.get();
  profile.value = profileStore.getResponse?.data;
  refreshing.value = false;
};

const onLogout = async () => {
  logoutBtnLoading.value = true;

  showConfirmDialog({
    title: "Logout",
    message: "Are you sure, you want to logout?",
    cancelButtonText: "Cancel",
    confirmButtonText: "Confirm",
    confirmButtonColor: "#1CBC9B",
  })
    .then(async () => {
      await logoutStore.store();

      if (logoutStore.getErrorMessage == null) {
        ls.remove("__access-token");
        showSuccessToast(logoutStore.getResponse?.message);
        router.push("/");
      }

      logoutBtnLoading.value = false;
    })
    .catch(() => {
      logoutBtnLoading.value = false;
    });
};

const onRefresh = () => {
  fetchProfile();
};

onMounted(() => {
  fetchProfile();
});
</script>

<style scope></style>
