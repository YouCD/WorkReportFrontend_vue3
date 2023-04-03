<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo"/>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined/>
          <span>
            <router-link to="/">
              Home</router-link>
          </span>
        </a-menu-item>
        <a-sub-menu :key="index" v-for="(item,index) in menuList ">
          <template #title>
            <span>
              <component :is="$icons[item.icon]"/>
              <span>{{ item.menu }}</span>
            </span>
          </template>
          <a-menu-item :key="children" v-for="(children,index) in item.children ">
            <component :is="$icons[children.icon]" class="icon"/>

            <router-link :to="children.path"> {{ children.menu }}</router-link>
          </a-menu-item>
        </a-sub-menu>


      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
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
import {ref} from 'vue';

let menuList = ref([
  {
    menu: "日志",
    icon: "TabletFilled",
    children: [{
      menu: "浏览日志",
      icon: "SoundFilled",
      path: "/log"
    }]
  },
  {
    menu: "设置",
    icon: "SettingFilled",
    children: [{
      menu: "字典设置",
      icon: "ToolFilled",
      path: "/seting"
    }]
  }
])
const collapsed = ref(true)
const selectedKeys = ref([])

</script>
<style>
/*#components-layout-demo-side .logo {*/
/*  height: 32px;*/
/*  margin: 16px;*/
/*  background: rgba(255, 255, 255, 0.3);*/
/*}*/

/*.site-layout .site-layout-background {*/
/*  background: #fff;*/
/*}*/
/*[data-theme='dark'] .site-layout .site-layout-background {*/
/*  background: #141414;*/
/*}*/

.icon {
  padding-right: 10px
}
</style>