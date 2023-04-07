<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo"/>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="99">
          <template #icon>
            <pie-chart-outlined/>

            <Icon :icon="PieChartOutlined"></Icon>
          </template>
          <router-link to="/">
            Home
          </router-link>
        </a-menu-item>
        <a-sub-menu :key="index" v-for="(item,index) in menuList ">
          <template #title>
            <span>
               <Icon :icon="item.icon"></Icon>
              <span>{{ item.menu }}</span>
            </span>
          </template>
          <a-menu-item :key="children" v-for="(children,index) in item.children ">
            <Icon :icon="children.icon" class="icon"></Icon>
<!--            <component :is="icons[children.icon]" class="icon"/>-->
            <router-link :to="children.path"> {{ children.menu }}</router-link>
          </a-menu-item>
        </a-sub-menu>


      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div style="float: right;padding-right: 35px"  >
          <a v-if="!data.showUpdateDiv" >{{ data.UpdateMsg }}</a>
          <a v-if="data.showUpdateDiv" @click="UpdateHandler" >{{ data.UpdateMsg }}</a>
        </div>
        <!--        <a-breadcrumb style="margin: 16px">-->
        <!--          <a-breadcrumb-item>User</a-breadcrumb-item>-->
        <!--          <a-breadcrumb-item>Bill</a-breadcrumb-item>-->
        <!--        </a-breadcrumb>-->

      </a-layout-header>
      <a-layout-content style="margin:  16px">
        <div :style="{ padding: '12px', minHeight: '360px' }">
          <router-view/>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        WorkLogSystem ©2021 Created by YouCD
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {BaseUrl} from "@/request";
import {UpdateCheck} from "@/types/update";
import Icon from "@/components/Icon.vue"
import { TabletFilled, SoundFilled, SettingFilled,ToolFilled,PieChartOutlined} from '@ant-design/icons-vue';
import {Urls} from "@/request/url";
import {treemap} from "@antv/g2plot/lib/utils/hierarchy/treemap";

let menuList = ref([
  {
    menu: "日志",
    icon: TabletFilled,
    children: [{
      menu: "浏览日志",
      icon: SoundFilled,
      path: "/log"
    }]
  },
  {
    menu: "设置",
    icon: SettingFilled,
    children: [{
      menu: "字典设置",
      icon: ToolFilled,
      path: "/seting"
    }]
  }
])
const collapsed = ref(true)
const selectedKeys = ref([])


const webSock = ref<WebSocket>()


const data = ref({
  UpdateMsg: "",
  showUpdateDiv:false
})
// Websoket连接成功事件
const websocketonopen = (res: any) => {
  console.log("WebSocket连接成功", res);
};
// Websoket接收消息事件
const websocketonmessage = (res: any) => {
  data.value.UpdateMsg=res.data
};
// Websoket连接错误事件
const websocketonerror = (res: any) => {
  console.log("连接错误", res);
};
// Websoket断开事件
const websocketclose = (res: any) => {
  console.log("断开连接", res);
};

const initWebSocket = () => { //初始化weosocket
  let wsUrl = ""
  let protocol = undefined
  if (window.location.protocol === "http:") {
    protocol = "ws://"
  } else if (window.location.protocol === "https:") {
    protocol = "wss://"
  }
  wsUrl = protocol + BaseUrl().split("//")[1] + Urls.update;
  webSock.value = new WebSocket(wsUrl);

  // 3.服务器每次返回信息都会执行一次onmessage方法
  webSock.value.onmessage = function (e) {
    console.log("服务器返回的信息: " + e.data);
  };

  webSock.value.onopen = websocketonopen;
  webSock.value.onmessage = websocketonmessage;
  webSock.value.onerror = websocketonerror;
  webSock.value.onclose = websocketclose;
}

onMounted(async () => {
  const d=await UpdateCheck()
  if (JSON.stringify(d.data)!=="{}"){
    data.value.showUpdateDiv=true
    data.value.UpdateMsg=d.msg
  }else if(d.msg==="更新完成，请重启软件！"){
    data.value.showUpdateDiv=false
    data.value.UpdateMsg=d.msg
  }
})

const UpdateHandler=()=>{
  data.value.showUpdateDiv=false
  initWebSocket()
}

</script>
<style>


.icon {
  padding-right: 10px
}
</style>