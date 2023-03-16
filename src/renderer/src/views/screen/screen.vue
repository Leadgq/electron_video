<template>
  <div class="w-full h-full bg-black flex">
    <div class="w-[70%] h-full">
      <div class="tools w-full h-[40px] py-3 pl-2 cursor-pointer">
        <img :src="leftImage" alt="" @click="back" />
      </div>
      <video class="h-[80%] w-full"></video>
    </div>
    <div class="flex-1 flex items-center py-3 flex-col">
      <div
        v-for="item in list"
        :key="item.key"
        class="text-white h-[30px] flex items-center common-color mb-5 text-sm cursor-pointer w-[50%] justify-center"
        @click="activeAction(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@renderer/router'
import { ref, Ref } from 'vue'
import leftImage from '../../assets/image/left.png'

type btnActionType = {
  name: string
  key: string
}
const list: Ref<btnActionType[]> = ref([
  {
    name: '开始录制',
    key: 'start'
  },
  {
    name: '暂停录制',
    key: 'pause'
  },
  {
    name: '结束录制',
    key: 'end'
  }
])
const back = () => router.back()

const isStart = ref(false)
const mediaRecorder = ref()

const activeAction = (item: btnActionType) => {
  const map = {
    start: () => {
      isStart.value = true
      // 开始录制
      startRecord()
    },
    pause: () => {
      if (!IsStartRecord()) return
    },
    end: () => {
      if (!IsStartRecord()) return
    }
  }
  for (const key in map) {
    if (key === item.key) map[key]()
  }
}
// 是否开始
const IsStartRecord = () => isStart.value
const startRecord = async () => {
  const options = {
    audio: false,
    video: true
  }
  const config = { mimeType: 'video/webm; codecs=vp8' }
  try {
    const stream = await navigator.mediaDevices.getUserMedia(options)
    const video = document.querySelector('video')!
    video.srcObject = stream
    video.onloadedmetadata = () => video.play()
    mediaRecorder.value = new MediaRecorder(stream, config)
    mediaRecorder.value.ondataavailable = handleDataAvailable
    mediaRecorder.value.start()
  } catch (error) {
    console.log(error)
  }
}

const handleDataAvailable = (event: unknown) => {
  console.log(event)
}
</script>

<style lang="scss" scoped>
.tools {
  img {
    width: 15px;
    height: 15px;
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
</style>
