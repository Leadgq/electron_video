<template>
  <div class="w-full h-full flex justify-center bg-black p-5">
    <div class="box-card w-[50%] h-full border flex flex-col">
      <header class="text-center text-white border-b py-3 text-sm">工具区</header>
      <div class="flex-1 flex flex-col items-center overflow-y-auto p-3 tools-container">
        <div
          v-for="item in toolsList"
          :key="item.key"
          class="tool-list text-white mt-3 mb-3 h-[30px] flex justify-center items-center cursor-pointer"
          @click="jumpToPage(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import router from '../router'

type listType = {
  key: string
  name: string
  path: string
}
const toolsList: Ref<listType[]> = ref([
  {
    key: '1',
    name: '视频查看',
    path: '/video'
  },
  {
    key: '2',
    name: '图片压缩',
    path: '/image'
  },
  {
    key: '3',
    name: '屏幕录制',
    path: '/screen'
  }
])
const jumpToPage = (item: listType) => {
  if (item.path === 'video') {
    window.api.changeWindowSize(1200, 600)
  } else if (item.path === 'screen') {
    window.api.changeWindowSize(800, 600)
  }
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
.tools-container {
  box-sizing: border-box;

  .tool-list {
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(10, 161, 51, 0.8) 0%,
      rgba(0, 20, 104, 0.8) 100%,
      rgba(0, 20, 104, 0.8) 100%
    );
  }
}
</style>
