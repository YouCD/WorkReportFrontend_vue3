<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-if="!isMobile"
      v-model:collapsed="collapsed"
      collapsible
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="99">
          <template #icon>
            <Icon :icon="PieChartOutlined"></Icon>
          </template>
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-sub-menu v-for="(item, index) in menu" :key="item.path">
          <template #title>
            <span>
              <Icon :icon="item.icon"></Icon>
              <span>{{ item.name }}</span>
            </span>
          </template>
          <a-menu-item
            v-for="(children, index1) in item.children"
            :key="children.path"
          >
            <Icon :icon="children.icon" class="icon"></Icon>
            <router-link :to="'/' + item.path + '/' + children.path">
              {{ children.name }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-drawer
      v-if="isMobile"
      :open="drawerVisible"
      placement="left"
      :closable="false"
      :width="200"
      :body-style="{ padding: 0 }"
      @close="drawerVisible = false"
    >
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        style="height: 100%"
      >
        <a-menu-item key="99">
          <template #icon>
            <Icon :icon="PieChartOutlined"></Icon>
          </template>
          <router-link to="/" @click="drawerVisible = false">Home</router-link>
        </a-menu-item>
        <a-sub-menu v-for="(item, index) in menu" :key="item.path">
          <template #title>
            <span>
              <Icon :icon="item.icon"></Icon>
              <span>{{ item.name }}</span>
            </span>
          </template>
          <a-menu-item
            v-for="(children, index1) in item.children"
            :key="children.path"
          >
            <Icon :icon="children.icon" class="icon"></Icon>
            <router-link
              :to="'/' + item.path + '/' + children.path"
              @click="drawerVisible = false"
            >
              {{ children.name }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-drawer>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="header-content">
          <a-button
            v-if="isMobile"
            type="text"
            class="mobile-menu-btn"
            @click="drawerVisible = true"
          >
            <template #icon>
              <MenuOutlined />
            </template>
          </a-button>
          <div class="header-right">
            <a v-if="!data.showUpdateDiv">{{ data.UpdateMsg }}</a>
            <a v-if="data.showUpdateDiv" @click="UpdateHandler">
              {{ data.UpdateMsg }}
            </a>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content :class="['layout-content', { 'layout-content-mobile': isMobile }]">
        <div :style="{ padding: isMobile ? '8px' : '12px', minHeight: '360px' }">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        WorkLogSystem ©2021 Created by YouCD
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { BaseUrl } from '@/request'
import { UpdateCheck } from '@/types/update'
import Icon from '@/components/Icon.vue'
import { PieChartOutlined, MenuOutlined } from '@ant-design/icons-vue'
import { Urls } from '@/request/url'
import { menu } from '@/router'

const collapsed = ref(true)
const selectedKeys = ref([])
const isMobile = ref(false)
const drawerVisible = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

checkMobile()
window.addEventListener('resize', checkMobile)

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const webSock = ref<WebSocket>()

const data = ref({
  UpdateMsg: '',
  showUpdateDiv: false,
})
// Websoket连接成功事件
const websocketonopen = (res: any) => {
  console.log('WebSocket连接成功', res)
}
// Websoket接收消息事件
const websocketonmessage = (res: any) => {
  data.value.UpdateMsg = res.data
}
// Websoket连接错误事件
const websocketonerror = (res: any) => {
  console.log('连接错误', res)
}
// Websoket断开事件
const websocketclose = (res: any) => {
  console.log('断开连接', res)
}

const initWebSocket = () => {
  //初始化weosocket
  let wsUrl = ''
  let protocol = undefined
  if (window.location.protocol === 'http:') {
    protocol = 'ws://'
  } else if (window.location.protocol === 'https:') {
    protocol = 'wss://'
  }
  wsUrl = protocol + BaseUrl().split('//')[1] + Urls.update
  webSock.value = new WebSocket(wsUrl)

  // 3.服务器每次返回信息都会执行一次onmessage方法
  webSock.value.onmessage = function (e) {
    console.log('服务器返回的信息: ' + e.data)
  }

  webSock.value.onopen = websocketonopen
  webSock.value.onmessage = websocketonmessage
  webSock.value.onerror = websocketonerror
  webSock.value.onclose = websocketclose
}

onMounted(async () => {
  const d = await UpdateCheck()
  if (JSON.stringify(d.data) !== '{}') {
    data.value.showUpdateDiv = true
    data.value.UpdateMsg = d.msg
  } else if (d.msg === '更新完成，即将重启软件！') {
    data.value.showUpdateDiv = false
    data.value.UpdateMsg = d.msg
  }
})

const UpdateHandler = () => {
  data.value.showUpdateDiv = false
  initWebSocket()
}
</script>
<style>
.icon {
  padding-right: 10px;
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.mobile-menu-btn {
  font-size: 18px;
}
.header-right {
  margin-left: auto;
  padding-right: 16px;
}
.layout-content {
  margin: 16px;
}
.layout-content-mobile {
  margin: 8px;
}
</style>
