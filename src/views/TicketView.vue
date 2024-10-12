<template>
  <van-nav-bar
    title="Ticket"
    :fixed="true"
    left-text=""
    left-arrow
    @click-left="onClickLeft"
  />

  <div class="pt-[46px]"></div>

  <List :store-name="`ticketStore`" :query-parameters="{}" />
</template>

<script setup>
import List from "@/components/List.vue";

const onClickLeft = () => history.back();
</script>

<style scope></style>
