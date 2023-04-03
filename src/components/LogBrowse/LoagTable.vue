<template>
  <a-table
      :columns="data.columns"
      :data-source="data.tableData"
      :row-key="record => record.id"
      :pagination="data.pagination"
      @change="handleTableChange"
      size="small"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.title === '操作'">
        <a>编辑</a>
        <a-divider type="vertical"/>
        <a>删除</a>

      </template>
      <template v-if="column.title === '日期'">
        {{ moment.unix(record.date).format("YYYY-MM-DD") }}
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive,defineComponent} from "vue"
import moment from "moment"
import "moment/locale/zh-cn";
import {FetchLog} from "../../request/log";
import {PageRequestData, WorkContent, WorkContentRespList} from "../../types/log";

moment.locale('zh-cn')


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
const defaultPageObj: PageRequestData = {
  pageIndex: 1,
  pageSize: pagination.value.defaultPageSize
}

const handleTableChange = (pag: any, ) => {
  const a = {
    pageIndex: pag.current,
    pageSize: pag.pageSize
  } as PageRequestData
  FetchLog(a).then((res) => {
    const a = res.data as WorkContentRespList
    data.tableData = a.work_content_resp_list
  })
};


const data = reactive({
  tableData: [] as WorkContent[],
  columns,
  pagination,
  activeKey:0,
})


//  获取 工作日志
onMounted(() => {
      FetchLog(defaultPageObj).then(res => {
        const resData = res.data as WorkContentRespList
        data.tableData = resData.work_content_resp_list
      })
    }
)

</script>

<style scoped>

</style>