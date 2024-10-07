<template>
  <van-nav-bar title="Station" :fixed="true" />

  <div class="pt-[46px]"></div>

  <van-pull-refresh
    v-model="refreshing"
    pulling-text="Pull to refresh"
    loosing-text="Pull to refresh"
    loading-text="Loading"
    success-text="Successfully loaded"
    @refresh="onRefresh"
  >
    <van-list
      v-model:loading="loading"
      v-model:error="error"
      :finished="finished"
      loading-text="Loading"
      finished-text=""
      :error-text="errorMessage"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.slug" :title="item.title" />
    </van-list>
  </van-pull-refresh>
</template>

<script setup>
import { useStationStore } from "@/stores/userPortal/stationStore";
import { ref } from "vue";

const stationStore = useStationStore();
const queryParameters = ref({});
const list = ref([]);
const page = ref(1);
const last_page = ref(null);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const error = ref(false);
const errorMessage = ref(null);

const onLoad = async () => {
  if (refreshing.value) {
    list.value = [];
    page.value = 1;
    last_page.value = null;
    refreshing.value = false;
  }

  queryParameters.value.page = page.value;

  await stationStore.get(queryParameters.value);
  list.value.push(...(stationStore.getResponse?.data ?? []));
  last_page.value = stationStore.getResponse?.meta.last_page ?? null;

  if (page.value >= last_page.value) {
    finished.value = true;
  } else {
    page.value++;
  }

  if(stationStore.getErrorMessage){
    errorMessage.value = stationStore.getErrorMessage;
    error.value = true;
  }

  loading.value = false;
};

const onRefresh = () => {
  finished.value = false;
  loading.value = true;
  onLoad();
};
</script>

<style scope></style>
