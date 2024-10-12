<template>
  <van-nav-bar
    title="Wallet Transaction"
    :fixed="true"
    left-text=""
    left-arrow
    @click-left="onClickLeft"
  />

  <div class="pt-[46px]"></div>

  <List :store-name="`walletTransactionStore`" :query-parameters="{}" />
</template>

<script setup>
import List from "@/components/List.vue";

const onClickLeft = () => history.back();
</script>

<style scope></style>
