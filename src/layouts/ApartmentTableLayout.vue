<template>
  <div>
    <el-table ref="tableRef" row-key="date" :data="filterTableData" style="width: 100%">
      <el-table-column prop="aid" label="aid"/>
      <el-table-column
          prop="createTime"
          label="创建日期"
          sortable
          column-key="date"
      >
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="apartmentName" label="名称"/>
      <el-table-column prop="address" label="Address" :formatter="formatter"/>

      <el-table-column
          prop="type"
          label="类型"
          width="100"
          :filters="[
        { text: '日租', value: 0 },
        { text: '月租', value: 1 },
        { text: '混合', value: 2 },
      ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag
              :type="scope.row.type === '2' ? '' : 'success'"
              disable-transitions
          >{{ handleType(scope.row.type) }}
          </el-tag
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          @prev-click="preOnclick"
          @next-click="nextOnclick"
          @current-change="onPageChange"
          :total="filterTableData?.length">
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'

const props = defineProps({
  pageSize: Number,
  search: String,
  preOnclick: Function,
  nextOnclick: Function,
  onPageChange: Function,
  formatter: Function,
  filterTableData: Array,
  formatDate: Function,
  filterTag: Function,
  handleType: Function,
})
</script>
<style scoped>
.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>