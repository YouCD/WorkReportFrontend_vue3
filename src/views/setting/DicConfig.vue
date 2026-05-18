<template>
  <div class="dic-left">
    <a-tree :tree-data="treeData" v-model:expandedKeys="expandedKeys"></a-tree>
  </div>

  <div class="dic-right">
    <div class="dic-form-row">
      <a-input
        class="dic-form-input"
        v-model:value="data.type1Data.description"
        placeholder="请输入工作大类"
      />
      <a-button @click="AddType1Handler" type="primary">添加</a-button>
    </div>
    <div class="dic-form-row">
      <a-select
        ref="select"
        v-model:value="data.type2Data.pid"
        class="dic-form-select"
      >
        <a-select-option
          :value="item.id"
          :key="item.id"
          v-for="item in type1Data"
        >
          {{ item.description }}
        </a-select-option>
      </a-select>

      <a-input
        class="dic-form-select"
        v-model:value="data.type2Data.description"
        placeholder="请输入工作子类"
      />
      <a-button @click="AddType2Handler" type="primary">添加</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { AddType, ITypeData } from '@/types/seting'
import { storeToRefs } from 'pinia'
import { type1Store } from '@/store/type1'
import { FetchType2 } from '@/types/type2'
import { DataNode } from 'ant-design-vue/es/vc-tree/interface'

const data = reactive({
  type1Data: {} as ITypeData,
  type2Data: {} as ITypeData,
})

const { type1Data } = storeToRefs(type1Store())
const { getType1List, FindType1ByDescription } = type1Store()

const treeDataTemp = ref<DataNode>({
  key: '工作类别',
  title: '工作类别',
  children: [],
})

//  最上层ID
const TreeTopKey = 999999

const expandedKeys = ref<number[]>([TreeTopKey])
const treeData = computed(() => {
  const rootDataNode: DataNode = {
    key: TreeTopKey,
    title: '工作大类',
    children: treeDataTemp.value.children,
  }
  return [rootDataNode]
})

onMounted(async () => {
  await getType1List()
  data.type2Data.pid = type1Data.value[0].id

  TreeDataHandler()
})

const TreeDataHandler = async () => {
  const type1List = type1Data.value
  if (type1List.length) {
    const pid = type1List[0].id
    data.type2Data.pid = pid

    //  重置 原有的数据
    treeDataTemp.value.children = []
    expandedKeys.value = [TreeTopKey]
    const type2ListPromises = type1List.map(async (type1) => {
      const treData1: DataNode = {
        title: type1.description,
        key: type1.id,
        children: [],
      }
      expandedKeys.value.push(type1.id)

      const res = await FetchType2({ pid: type1.id })
      if (res.data.type_list) {
        const type2List = res.data.type_list.map((type2) => {
          const treData2: DataNode = {
            title: type2.description,
            key: type2.id,
          }
          return treData2
        })
        treData1.children = type2List
      }

      // 判断 treeDataTemp.children 是否为 undefined
      if (treeDataTemp.value.children === undefined) {
        treeDataTemp.value.children = []
      }
      treeDataTemp.value.children.push(treData1)

      return treData1
    })

    const treeDataList = await Promise.all(type2ListPromises)
    const rootDataNode: DataNode = {
      key: '工作类别',
      title: '工作类别',
      children: treeDataList,
    }
    treeData.value.push(rootDataNode)
  }
}

// 添加工作大类
const AddType1Handler = async () => {
  if (data.type1Data.description === '') {
    return
  }
  data.type1Data.type = 1
  data.type1Data.pid = 0
  await AddType(data.type1Data)
  await getType1List()
  data.type1Data.description = ''
  TreeDataHandler()
}

// 添加工作子类
const AddType2Handler = async () => {
  if (data.type2Data.description === '') {
    return
  }
  data.type2Data.type = 2
  await AddType(data.type2Data)
  data.type2Data.description = ''
  TreeDataHandler()
}
</script>

<style scoped>
.dic-left {
  float: left;
  width: 48%;
}

.dic-right {
  float: right;
  width: 48%;
}

.dic-form-row {
  padding: 10px;
  margin-bottom: 10px;
  background: white;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.dic-form-input {
  flex: 1;
  min-width: 0;
}

.dic-form-select {
  flex: 1;
  min-width: 0;
}

@media (max-width: 768px) {
  .dic-left,
  .dic-right {
    float: none;
    width: 100%;
    margin-bottom: 10px;
  }

  .dic-form-select {
    flex: 1 1 100%;
  }
}
</style>
