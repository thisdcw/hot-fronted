<template>
  <div>
    <el-table :data="filterTableData" style="width: 100%" :border="true" :fit="true">
      <el-table-column label="uid" prop="uid" align="center"/>
      <el-table-column label="头像" prop="avatar" align="center">
        <template #default="{ row }">
          <img :src="row.avatar" alt="" class="avatar-img"/>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username" align="center"/>
      <el-table-column label="账户" prop="userAccount" align="center"/>
      <el-table-column label="性别" prop="gender" align="center"/>
      <el-table-column label="手机号" prop="phone" align="center"/>
      <el-table-column label="邮箱" prop="email" align="center"/>
      <el-table-column label="角色" prop="userRole" align="center"/>

      <el-table-column label="更新时间" prop="updateTime" align="center">
        <template #default="{ row }">
          {{ formatDate(row.updateTime) }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center">
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark" align="center"/>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small"  @click="handleEdit && handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="() => handleDelete && handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
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
  filterTableData: Array,
  handleEdit: Function,
  handleDelete: Function,
  onPageChange: Function,
  formatDate: Function,
});

</script>
<style scoped>
.avatar-img {
  width: 80px; /* 图片宽度 */
  height: 80px; /* 图片高度 */
  object-fit: cover; /* 保持图片比例并填充 */
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>