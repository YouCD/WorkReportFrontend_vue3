<template>
  <div style="float: left;width: 48%;">


    <!--    v-model:expandedKeys="expandedKeys"-->
    <!--    v-model:selectedKeys="selectedKeys"-->
    <!--    v-model:checkedKeys="checkedKeys"-->
    <a-tree


        :tree-data="treeData"
    >
      <template #title="{ title, key }">
        <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
        <template v-else>{{ title }}</template>
      </template>
    </a-tree>


  </div>


  <div style="float: right;width: 48%;">
    <div style="padding: 10px;margin-bottom: 10px;background: white">
      <a-input style="width: 80%" v-model:value="data.type1Data.description" placeholder="请输入工作大类"/>
      <a-button @click="AddType1Handler" type="primary">添加</a-button>
    </div>
    <div style="padding: 10px;margin-bottom: 10px;background: white">
      <a-select
          ref="select"
          v-model:value="data.type2Data.pid"
          class="SelectClass"
      >
        <a-select-option :value="item.id" :key="item.id" v-for="item in type1Data">
          {{ item.description }}
        </a-select-option>
      </a-select>

      <a-input class="SelectClass" v-model:value="data.type2Data.description" placeholder="请输入工作大类"/>
      <a-button @click="AddType2Handler" type="primary">添加</a-button>
    </div>

  </div>

</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {AddType, ITypeData} from "@/types/seting";
import {storeToRefs} from "pinia";
import {type1Store} from "@/store/type1";
import {TreeProps} from "ant-design-vue";
import {FetchType2} from "@/types/type2";

const data = reactive({
      type1Data: {} as ITypeData,
      type2Data: {} as ITypeData,
    }
)

interface treeItem {
  title: string,
  key: string | number,
  children: []
}

const treData = {} as treeItem;

const {type1Data} = storeToRefs(type1Store())
const {getType1List, FindType1ByDescription} = type1Store()
onMounted(async () => {
  await getType1List()
  data.type2Data.pid = type1Data.value[0].id

  // type1Data.value.forEach(item => {
  //   const treData1 = [] as treeItem[];
  //
  //
  //   treData1.key = item.id as number
  //   treData1.title=item.description
  //
  //   FetchType2({pid: item.pid}).then(res => {
  //
  //     if (!res.data.type_list ) {
  //       // const a: treeItem = {
  //       //   title: item.description,
  //       //   key: item.id,
  //       //   children: []
  //       // }
  //       // treData1.children.push(a)
  //       console.log("cccc", item)
  //       console.log("treData.value?.children", item)
  //
  //       // res.data.type_list.forEach(iii => {
  //       //   var  b:treeItem = {
  //       //     title: iii.description,
  //       //     key: iii.id
  //       //   }
  //       //
  //       //   a.children?.push(b)
  //       //   console.log("iii", b)
  //       //
  //       // })
  //     }
  //     treData.children.push(treData1)
  //     console.log("必必剥剥必必剥剥必必剥剥", treData)
  //
  //   })
  // })
})

// 添加工作大类
const AddType1Handler = async () => {
  if (data.type1Data.description === "") {
    return
  }
  data.type1Data.type = 1
  data.type1Data.pid = 0
  await AddType(data.type1Data)
  await getType1List()
  data.type1Data.description = ""
}

// 添加工作子类
const AddType2Handler = () => {
  if (data.type2Data.description === "") {
    return
  }
  data.type2Data.type = 2
  AddType(data.type2Data)
  data.type2Data.description = ""
}


const treeData: TreeProps['treeData'] = [
  {
    title: '工作类别',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {title: 'leaf', key: '0-0-0-0', disableCheckbox: true},
          {title: 'leaf', key: '0-0-0-1'},
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{key: '0-0-1-0', title: 'sss'}],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{key: '0-0-1-0', title: 'sss'}],
      },
    ],
  },
];


//
//
//
//
//
// const expandedKeys = ref<string[]>(['0-0-0', '0-0-1']);
// const selectedKeys = ref<string[]>(['0-0-0', '0-0-1']);
// const checkedKeys = ref<string[]>(['0-0-0', '0-0-1']);
// watch(expandedKeys, () => {
//   console.log('expandedKeys', expandedKeys);
// });
// watch(selectedKeys, () => {
//   console.log('selectedKeys', selectedKeys);
// });
// watch(checkedKeys, () => {
//   console.log('checkedKeys', checkedKeys);
// });

</script>

<style scoped>
.SelectClass {
  width: calc(40% - 5px);
  margin-right: 5px;

}
</style>