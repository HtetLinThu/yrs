<template>
  <van-cell-group inset class="mb-3 mx-0" v-for="item in list" :key="item.slug">
    <van-cell :to="`/wallet-transaction/${item.trx_id}`">
      <template #icon>
        <img :src="item.icon" alt="" class="w-8 h-8 mr-2 mt-1" />
      </template>
      <template #title>
        <van-text-ellipsis :content="item.trx_id" />
      </template>
      <template #label>
        <span>{{ item.created_at }}</span>
      </template>
      <template #value>
        <span :style="`color: #${item.method.color}`"
          >{{ item.method.sign }}{{ item.amount }}</span
        >
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script setup>
const props = defineProps({
  list: { type: Array, required: true },
});
</script>

<style scope></style>
