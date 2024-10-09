<template>
  <van-nav-bar title="Route" :fixed="true" />

  <div class="pt-[46px]"></div>

  <List :store-name="`routeStore`" />
</template>

<script setup>
import List from "@/components/List.vue";
</script>

<style scope></style>
