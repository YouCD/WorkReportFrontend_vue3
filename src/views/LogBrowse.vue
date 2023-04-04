<template>
  <div class="headerBar"  >
    <a-tabs v-model:activeKey="data.activeKey" >
      <a-tab-pane :key="1" tab="查看" force-render/>
      <a-tab-pane :key="2" tab="添加" force-render/>
    </a-tabs>
  </div>
  <div >
   <div  class="headerBar"  v-if="data.showTable">  <LoagTable/> </div>
    <AddLog v-if="data.showAddLog"/>

  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, reactive,watch} from "vue"

import LoagTable from "@/components/LogBrowse/LoagTable.vue"
import AddLog from "@/components/LogBrowse/AddLog.vue"



const data = reactive({
  activeKey:2,
  showTable:false,
  showAddLog:true,
})

watch(
    () => data.activeKey,
    (newValue, oldValue) => {
        if (newValue==1){
          data.showTable=true
          data.showAddLog=false
        }else if (newValue==2){
          data.showTable=false
          data.showAddLog=true
        }
    }, {immediate:true}
)


</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}

.headerBar {
  padding: 10px;
  margin-bottom: 10px;
  background: white;
}


</style>