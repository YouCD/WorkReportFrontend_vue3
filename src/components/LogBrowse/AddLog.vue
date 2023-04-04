<template>

  <div class="BoxClass">

    <div class="LeftClass">
      <div class="CalendarClass">
        <a-config-provider :locale="locale">
          <a-calendar v-model:value="today" :fullscreen="false" @panelChange="onPanelChange" :locale="locale"
                      valueFormat="YYYY-MM-DD"
                      @select="onSelect"/>
        </a-config-provider>
      </div>
      <a-button type="primary" style="width: 100%;margin-top: 8px" @click="goToday">今日</a-button>
    </div>


    <div class="RightClass">
      <a-textarea>

      </a-textarea>

    </div>

  </div>


</template>

<script setup lang="ts">
import {ref} from 'vue';

import dayjs, {Dayjs} from 'dayjs';

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import "dayjs/locale/zh-cn";
import moment from "moment";
import {ILogContent} from "@/types/log"; // 引入解决日历中英文混杂问题
const locale = ref(zhCN);

const log: ILogContent = {
  type1: 0,
  type2: 0,
  content: "",
  date: 0
}
const today = ref<Dayjs>();

const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode);
};

//  先泽某天
const onSelect = (value: Dayjs, mode: string) => {
  // 选择日期后 就直接转为 unix 时间戳
  log.date = moment(value.toString()).unix()
};

//
// tion goToday
//  @Description: 回到今天
//
function goToday() {
  today.value = dayjs()
  log.date = moment(today.value?.format("YYYY-MM-DD")).unix()
}

</script>

<style scoped>

.BoxClass {
  overflow: hidden;
}

.LeftClass {
  padding: 10px;
  width: 320px;
  height: 380px;
  background: white;
  float: left;
  border-radius: 4px

}

.CalendarClass {
  width: 300px;
  border: 1px solid #F0F2F5;
}


.RightClass {
  float: right;
  padding: 10px;
  width: calc(100% - 330px) ;
  background: white;
  border-radius: 4px
}


</style>