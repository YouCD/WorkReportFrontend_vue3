<template>

  <div class="BoxClass">

    <div class="LeftClass">
      <div class="CalendarClass">
        <a-config-provider :locale="locale">
          <a-calendar v-model:value="today" :fullscreen="false" :locale="locale"
                      valueFormat="YYYY-MM-DD"
                      @select="onSelect"/>
        </a-config-provider>
      </div>
      <a-button type="primary" style="width: 100%;margin-top: 8px" @click="goToday">今日</a-button>
    </div>

    <div class="CenterClass">

      <a-form
          :model="logData"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
      >
        <a-form-item
            label="工作大类"
            name="username"
            :rules="[{ required: true, message: '请选择工作大类' }]"
        >
          <a-select
              ref="select"
              v-model="logData.type1"
              style="width: 100%"
              @focus="focus"
              @change="type1handleChange"
          >
            <a-select-option :value="item.id" v-for="(item,index) in type1Data" :key="includes">
              {{ item.description }}
            </a-select-option>

          </a-select>
        </a-form-item>

        <a-form-item
            label="工作子类"
            name="password"
            :rules="[{ required: true, message: '请选择工作子类!' }]"
        >
          <a-select
              ref="select"
              style="width: 100%"
              v-model="logData.type2"
              @focus="focus"
              @change="type2handleChange"
          >

            type2Data

            <a-select-option :value="item.id" v-for="(item,index) in type2Data" :key="includes">
              {{ item.description }}
            </a-select-option>

          </a-select>

        </a-form-item>
      </a-form>
    </div>

    <div class="RightClass">
      <a-textarea>

      </a-textarea>
      <a-button type="primary" @click="AddLogHandler">添加</a-button>
    </div>

  </div>


</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';

import dayjs, {Dayjs} from 'dayjs';

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import "dayjs/locale/zh-cn";
import moment from "moment";
import {IAddLogData, } from "@/types/log";
import {storeToRefs} from "pinia";
import {type1Store} from "@/store/type1";
import {type2Store} from "@/store/type2";
import {IPid} from "@/types/type2";

const locale = ref(zhCN);


const today = ref<Dayjs>();

const logData: IAddLogData = reactive(
    {
      type1: 0,
      type2: 0,
      content: "",
      date: moment(dayjs().format("YYYY-MM-DD")).unix()
    }

)


//  选择某天
const onSelect = (value: Dayjs, mode: string) => {
  // 选择日期后 就直接转为 unix 时间戳
  logData.date = moment(value.toString()).unix()



};

//
// tion goToday
//  @Description: 回到今天
//
function goToday() {
  today.value = dayjs()
  logData.date = moment(today.value?.format("YYYY-MM-DD")).unix()
}


const type1handleChange = async (value: number) => {
  const d: IPid = {
    pid: value
  }
  const a = await getType2List(d)
  console.log(a);
  logData.type1=value

};

const type2handleChange = (value: number) => {
  logData.type2=value
  console.log("type2handleChange", value);
};


const onFinish = (e) => {
  console.log('Finish:', e);
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};


let data = reactive({});

// 工作大类
const {type1Data} = storeToRefs(type1Store())
const {getType1List} = type1Store()
onMounted(async () => {
      await getType1List()
    }
)
//  工作子类
const {type2Data} = storeToRefs(type2Store())
const {getType2List} = type2Store()


//  添加日志
const AddLogHandler = () => {
  console.log("添加日志", logData)
}


</script>

<style scoped>

.BoxClass {
  overflow: hidden;
  width: 100%;
}

.LeftClass {
  padding: 10px;
  width: 320px;
  height: 380px;
  background: white;
  float: left;
  border-radius: 4px;
  margin-right: 10px;
}

.CalendarClass {
  border: 1px solid #F0F2F5;

}


.RightClass {
  float: right;
  padding: 10px;
  width: calc(100% - 300px - 320px - 20px);
  background: white;
  border-radius: 4px;
}

.CenterClass {
  width: 300px;
  height: 380px;
  padding: 10px;
  /*border: 1px solid #F0F2F5;*/
  border: 1px solid #F0F2F5;
  border-radius: 4px;
  background: white;
  float: left;
}

</style>