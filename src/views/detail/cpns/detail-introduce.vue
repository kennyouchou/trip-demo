<template>
  <div class="detailintroduce">
    <h2 class="title">{{ priceIntro?.title }}</h2>
    <div class="content">
      {{ priceIntro?.introduction }}
    </div>
  </div>
</template>

<script setup>
import useDetailStore from "@/stores/modules/detail";
import { storeToRefs } from "pinia";

const detailStore = useDetailStore()
const { priceIntro } = storeToRefs(detailStore)
</script>

<style lang="less" scoped>
.detailintroduce {
  padding: 16px 12px;
  border-top: 5px solid #f2f3f4;

  .title {
    font-size: 14px;
    color: #000;
    font-weight: 700;
  }

  .content {
    margin-top: 10px;
    font-size: 12px;
    line-height: 1.5;
    color: #666;
  }
}
</style>