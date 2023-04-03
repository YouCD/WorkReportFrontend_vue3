<template>
  <a-table
      :columns="data.columns"
      :data-source="data.tableData"
      bordered
      :pagination="data.pagination"
      @change="handleTableChange"
      size="small"
  >
    <!--    <template #bodyCell="{ column, text, record }">-->
    <!--      <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">-->
    <!--        <div>-->
    <!--          <a-input-->
    <!--              v-if="editableData[record.key]"-->
    <!--              v-model:value="editableData[record.key][column.dataIndex]"-->
    <!--              style="margin: -5px 0"-->
    <!--          />-->
    <!--          <template v-else>-->
    <!--            {{ text }}-->
    <!--          </template>-->
    <!--        </div>-->
    <!--      </template>-->
    <!--      <template v-else-if="column.dataIndex === 'operation'">-->
    <!--        <div class="editable-row-operations">-->
    <!--          <span v-if="editableData[record.key]">-->
    <!--            <a-typography-link @click="save(record.key)">Save</a-typography-link>-->
    <!--            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">-->
    <!--              <a>Cancel</a>-->
    <!--            </a-popconfirm>-->
    <!--          </span>-->
    <!--          <span v-else>-->
    <!--            <a @click="edit(record.key)">Edit</a>-->
    <!--          </span>-->
    <!--        </div>-->
    <!--      </template>-->
    <!--    </template>-->
  </a-table>
</template>
<script setup lang="ts">
import {PageRequestData, WorkContent, WorkContentRespList} from "../types/log.js";
import {computed, onMounted, reactive} from "vue"
import {FetchLog} from "../request/log";

const columns = [
  {title: '日期', dataIndex: 'date',},
  {title: '工作大类', dataIndex: 'type1',},
  {title: '工作子类', dataIndex: 'type2'},
  {title: '工作内容', dataIndex: 'content'},
  {title: '操作', dataIndex: 'operation',}
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

const handleTableChange = (pag: any, filters: any, sorter: any) => {
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
.editable-row-operations a {
  margin-right: 8px;
}
</style>