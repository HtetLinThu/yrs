<template>
  <van-nav-bar
    title="Top Up History Detail"
    :fixed="true"
    left-text=""
    left-arrow
    @click-left="onClickLeft"
  />

  <van-pull-refresh
    v-model="refreshing"
    pulling-text="Pull to refresh"
    loosing-text="Pull to refresh"
    loading-text="Loading"
    success-text="Successfully loaded"
    @refresh="onRefresh"
  >
    <div v-if="topUpHistoryDetail != null">
      <div class="bg-theme pt-14 pb-20">
        <img
          :src="topUpHistoryDetail.image"
          alt=""
          class="w-20 h-20 p-1 bg-gray-100 rounded-lg mx-auto mb-3"
          v-viewer
        />

        <div class="text-center">
          <van-tag
            color="#fcfcfc"
            :text-color="`#${topUpHistoryDetail.status.color}`"
            size="medium"
            round
            >{{ topUpHistoryDetail.status.text }}</van-tag
          >
        </div>
      </div>

      <div class="p-3 relative" style="top: -74px">
        <van-cell-group inset class="mx-0 mb-3">
          <van-cell
            title="Trx ID"
            :value="topUpHistoryDetail.trx_id"
          ></van-cell>

          <van-cell
            title="Amount"
            :value="topUpHistoryDetail.amount"
          ></van-cell>

          <van-cell title="Status">
            <template #value>
              <span :style="`color: #${topUpHistoryDetail.status.color}`">{{
                topUpHistoryDetail.status.text
              }}</span>
            </template>
          </van-cell>

          <van-cell
            title="Created at"
            :value="topUpHistoryDetail.created_at"
          ></van-cell>

          <van-cell
            title="Approved at"
            :value="topUpHistoryDetail.approved_at"
          ></van-cell>

          <van-cell
            title="Rejected at"
            :value="topUpHistoryDetail.rejected_at"
          ></van-cell>

          <van-cell
            title="Description"
            :value="topUpHistoryDetail.description"
          ></van-cell>
        </van-cell-group>
      </div>
    </div>

    <div v-if="errorMessage != null" class="pt-14 px-3 pb-20">
      <div
        class="bg-white rounded-lg shadow-md flex justify-center items-center"
      >
        <div>
          <van-empty
            image="error"
            :description="errorMessage"
            class="text-center"
          />
        </div>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTopUpHistoryDetailStore } from "@/stores/topUpHistoryDetailStore";

const router = useRouter();
const route = useRoute();
const topUpHistoryDetailStore = useTopUpHistoryDetailStore();
const topUpHistoryDetail = ref(null);
const errorMessage = ref(null);
const refreshing = ref(false);

const onClickLeft = () => history.back();

const fetchTopUpHistoryDetail = async () => {
  await topUpHistoryDetailStore.get(route.params.trx_id);
  topUpHistoryDetail.value = topUpHistoryDetailStore.getResponse?.data;
  errorMessage.value = topUpHistoryDetailStore.getErrorMessage;
  refreshing.value = false;
};

const onRefresh = () => {
  fetchTopUpHistoryDetail();
};

onMounted(() => {
  fetchTopUpHistoryDetail();
});
</script>

<style scope></style>
