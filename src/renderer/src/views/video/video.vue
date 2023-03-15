<template>
  <div class="w-full h-full flex flex-col bg-black overflow-hidden">
    <div class="tools w-full h-[40px] py-3 pl-2 cursor-pointer">
      <img :src="leftImage" alt="" @click="back" />
    </div>
    <div class="flex-1 flex">
      <div id="videoContainer" class="h-full w-[70%]"></div>
      <div class="flex-1 tools-container">
        <img
          v-if="sourceList.length > 0"
          :src="setImage"
          alt=""
          class="img-set cursor-pointer"
          @click="isShowPlayList = !isShowPlayList"
        />
        <ul v-show="!isShowPlayList" :key="'tools'" class="w-full h-full p-3">
          <li class="w-full text-center right-tools" @click="uploadFile">上传视频</li>
        </ul>
        <ul v-if="isShowPlayList" :key="'play-list'" class="w-full h-[90%] p-3 overflow-auto">
          <div class="w-full text-white text-sm text-center mb-3">播放列表</div>
          <li
            v-for="(item, index) in sourceList"
            :key="index"
            class="text-white h-[30px] flex items-center justify-center common-color mb-5 text-sm cursor-pointer"
            :class="{ active: index === activeIndex }"
            @click="selectVideo(index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '../../router'
import Player from 'xgplayer'
import { ref, Ref } from 'vue'
import setImage from '../../assets/image/setting.png'
import leftImage from '../../assets/image/left.png'
import { isAvailableArray } from '../../util'
import { fileType } from '../../../../type'

const back = () => {
  window.api.resetWindowSize()
  router.back()
}
//  播放源
const videoUrl = ref('')

const sourceList: Ref<fileType[]> = ref([])
const activeIndex = ref(0)
// 播放器实例
const playInstance = ref()
// 是否展示播放列表
const isShowPlayList = ref(false)
const initVideo = () => {
  playInstance.value = new Player({
    id: 'videoContainer',
    url: videoUrl.value,
    width: '70%',
    height: '100%',
    lang: 'zh-cn',

    volume: 0.5,
    autoplay: false,
    videoInit: true,
    playbackRate: [0.5, 0.75, 1, 1.5, 2]
  })
}
// 销毁播放器
const destroyVideo = () => {
  if (playInstance.value) {
    playInstance.value.destroy()
  }
}
// 选择
const selectVideo = (index: number) => {
  activeIndex.value = index
  destroyVideo()
  const { blob } = sourceList.value[index]
  videoUrl.value = blob
  registerAndInit()
}
// 下一集对象
const nextVideo = (): fileType => {
  return sourceList.value[(activeIndex.value + 1) % sourceList.value.length]
}
const uploadFile = async () => {
  if (playInstance.value) playInstance.value.destroy()
  // 主进程调用上传文件方法
  const result = (await window.api.uploadFile()) as fileType[]
  if (!isAvailableArray(result)) return
  // 全部播放源
  sourceList.value = result
  // 当前播放源
  videoUrl.value = result[0].blob
  registerAndInit()
}

const registerAndInit = () => {
  // 初始化播放器
  initVideo()
  // 从新注册事件
  registerEvent()
}

// 注册事件
const registerEvent = () => {
  // 注册事件
  playInstance.value.on('ended', () => {
    if (isAvailableArray(sourceList.value) && sourceList.value.length > 1) {
      destroyVideo()
      const { blob } = nextVideo()
      changActiveIndex()
      videoUrl.value = blob
      registerAndInit()
    }
  })
}

const changActiveIndex = () => {
  activeIndex.value++
  if (activeIndex.value >= sourceList.value.length) activeIndex.value = 0
}
</script>

<style scoped lang="scss">
.tools {
  img {
    width: 15px;
    height: 15px;
  }
}

.tools-container {
  position: relative;

  .img-set {
    width: 15px;
    height: 15px;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.common-color {
  background: linear-gradient(
    90deg,
    rgba(10, 161, 51, 0.8) 0%,
    rgba(0, 20, 104, 0.8) 100%,
    rgba(0, 20, 104, 0.8) 100%
  );
}

.active {
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-name: breathe;
  -webkit-animation-duration: 1500ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
}

@keyframes breathe {
  0% {
    opacity: 0.4;
    box-shadow: 0 1px 2px rgba(0, 147, 223, 0.4), 0 1px 1px rgba(0, 147, 223, 0.1) inset;
  }

  100% {
    opacity: 1;
    border: 1px solid rgba(59, 235, 235, 0.7);
    box-shadow: 0 1px 30px #0093df, 0 1px 20px #0093df inset;
  }
}
.right-tools {
  @extend .common-color;
  color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
/*定义滚动条样式（高宽及背景）*/
::-webkit-scrollbar {
  width: 1px; /* 滚动条宽度， width：对应竖滚动条的宽度  height：对应横滚动条的高度*/
  background: #007acc;
}
/*定义滚动条轨道（凹槽）样式*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); /* 较少使用 */
  border-radius: 3px;
}
/*定义滑块 样式*/
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  height: 100px; /* 滚动条滑块长度 */
  background-color: #ccc;
}
</style>
