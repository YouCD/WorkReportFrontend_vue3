<template>
  <div >
    <div class="BoxLeftClass" v-motion :initial="{  opacity: 0,  x: -50,}" :enter="{  opacity: 1,  x: 0,}">
      <AddLog/>
    </div>
    <div class="RightClass" v-motion :initial="{  opacity: 0,  x: 50,}" :enter="{  opacity: 1,  x: 0,}">
      <LogTable/>
    </div>
  </div>
</template>
<script setup lang="ts">
import LogTable from "@/components/LogBrowse/LoagTable.vue"
import AddLog from "@/components/LogBrowse/AddLog.vue"


// const data = reactive({
//   activeKey: 2,
//   showTable: false,
//   showAddLog: true,
// })

// watch(
//     () => data.activeKey,
//     (newValue, oldValue) => {
//       if (newValue == 1) {
//         data.showTable = true
//         data.showAddLog = false
//       } else if (newValue == 2) {
//         data.showTable = false
//         data.showAddLog = true
//       }
//     }, {immediate: true}
// )


</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}


.BoxLeftClass {
  float: left;
}

.RightClass {
  height: 100%;
  float: right;
  width: calc(100% - 600px - 20px)
}


</style>