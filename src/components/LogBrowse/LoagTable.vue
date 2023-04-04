<template>
  <a-table
      :columns="data.columns"
      :data-source="LogData"
      :row-key="record => record.id"
      :pagination="data.pagination"
      @change="handleTableChange"
      size="small"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.title === '操作'">
        <a @click="EditHandler(record)">编辑</a>
        <a-divider type="vertical"/>
        <a>删除</a>
      </template>
      <template v-if="column.title === '日期'">
        {{ moment.unix(record.date).format("YYYY-MM-DD") }}
      </template>
    </template>
  </a-table>
  <!--  编辑日志 -->
  <a-modal v-model:visible="data.showEditModal" title="修改日志" @ok="handleOk">
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" @click="handleOk">完成</a-button>
    </template>
    <a-form
        :model="logItem"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
    >
      <a-form-item label="日期" name="date">
        <a-date-picker style="width: 100%" v-model:value="today" @select="onSelect"/>
      </a-form-item>

      <a-form-item label="工作大类" name="type1" :rules="[{ required: true, message: '请选择工作大类' }]">
        <a-select ref="select" v-model:value="logItem.type1" style="width: 100%" @change="type1handleChange">
          <a-select-option v-model:value="item.id" v-for="(item,index) in type1Data" :key="index">
            {{ item.description }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="工作子类" name="type2" :rules="[{ required: true, message: '请选择工作子类!' }]">
        <a-select
            ref="select"
            style="width: 100%"
            v-model:value="logItem.type2"
        >


          <a-select-option :value="item.id" v-for="(item,index) in type2Data" :key="index">
            {{ item.description }}
          </a-select-option>

        </a-select>

      </a-form-item>

      <a-form-item
          label="工作内容"
          name="content"
          :rules="[{ required: true, message: '请输入工作内容' }]"
      >
        <a-textarea :rows="5" v-model:value="logItem.content">

        </a-textarea>
      </a-form-item>


    </a-form>

  </a-modal>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive,} from "vue"
import moment from "moment"
import "moment/locale/zh-cn";
import {IAddLogData, IPageRequestData, IWorkContent, ModifyLog} from "@/types/log";
import {logStore} from "@/store/log";
import {storeToRefs} from "pinia";

import {type2Store} from "@/store/type2";
import {type1Store} from "@/store/type1";


import "dayjs/locale/zh-cn";
import dayjs, {Dayjs} from "dayjs";


const columns = [
  {title: '日期', dataIndex: 'date',},
  {title: '工作大类', dataIndex: 'type1',},
  {title: '工作子类', dataIndex: 'type2'},
  {title: '工作内容', dataIndex: 'content'},
  {title: '操作', key: 'operation',}
];


const pagination = computed(() => ({
  total: 233,
  // current: current.value,
  // pageSize: pageSize.value,
  // showTotal:  total =>`总共 ${total} 项`,
  defaultPageSize: 10,
  // pageSizeOptions: ['5', '10', '15', '20'], // 可不设置使用默认
  showSizeChanger: true, // 是否显示pagesize选择
  showQuickJumper: true, // 是否显示跳转窗
}));


const handleTableChange = async (pag: any,) => {
  const a: IPageRequestData = {
    pageIndex: pag.current,
    pageSize: pag.pageSize
  }
  await getLogData(a)
};


const data = reactive({
  columns,
  pagination,
  showEditModal: false,
})

let logItem: IAddLogData = reactive({} as IAddLogData)

const {LogData} = storeToRefs(logStore())
const {getLogData} = logStore()

//  选择日期
const onSelect = (value: Dayjs,) => {
  logItem.date = moment(value.format("YYYY-MM-DD")).unix()
};

const defaultPageObj: IPageRequestData = {
  pageIndex: 1,
  pageSize: pagination.value.defaultPageSize
}
//  获取 工作日志
onMounted(() => {
  getLogData(defaultPageObj)
})

//  打开编辑 modal 框
const EditHandler = async (log: IWorkContent) => {
  data.showEditModal = true
  logItem.content = log.content
  logItem.type1 = log.type1_id
  logItem.date = log.date
  logItem.type2 = log.type2_id
  logItem.id = log.id
  await getType2List({pid: log.type1_id})
}

const today = computed(() => {
  return dayjs.unix(logItem.date)
})

//  modal编辑完成
const handleOk = () => {
  ModifyLog(logItem)
  data.showEditModal = false
  getLogData(defaultPageObj)
}
// 关闭 modal 框
const handleCancel = () => {
  data.showEditModal = false;
};


const {type1Data} = storeToRefs(type1Store())

const type1handleChange = async (value: number) => {
  await getType2List({pid: value})
  logItem.type2 = type2Data.value[0].id
};


// watch(
//     () => logItem.date,
//     (value, oldValue) => {
//     console.log(value)
//
//       today=dayjs.unix(value)
//
//
//     }, {immediate:true}
// )
//

//  工作子类
const {type2Data} = storeToRefs(type2Store())
const {getType2List} = type2Store()


</script>

<style scoped>

</style>