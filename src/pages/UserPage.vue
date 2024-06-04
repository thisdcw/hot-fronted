<template>
  <h2>用户列表</h2>

  <el-table :data="filterTableData" style="width: 100%" :border="true" :fit="false">
    <el-table-column label="uid" prop="uid"/>
    <el-table-column label="头像" prop="avatar" width="110">
      <template #default="{ row }">
        <img :src="row.avatar" alt="" class="avatar-img"/>
      </template>
    </el-table-column>
    <el-table-column label="用户名" prop="username" width="150"/>
    <el-table-column label="账户" prop="userAccount"/>
    <el-table-column label="性别" prop="gender" width="80"/>
    <el-table-column label="手机号" prop="phone" width="150"/>
    <el-table-column label="邮箱" prop="email" width="150"/>
    <el-table-column label="角色" prop="userRole"/>

    <el-table-column label="更新时间" prop="updateTime" width="150">
      <template #default="{ row }">
        {{ formatDate(row.updateTime) }}
      </template>
    </el-table-column>
    <el-table-column label="创建时间" prop="createTime" width="150">
      <template #default="{ row }">
        {{ formatDate(row.createTime) }}
      </template>
    </el-table-column>
    <el-table-column label="备注" prop="remark" width="150"/>
    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          编辑
        </el-button>
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
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
        @prev-click="onPreOnclick"
        @next-click="onNextOnclick"
        :total="userList.total">
    </el-pagination>
  </div>

</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue'
import {Type} from "@/model/Type";
import {fetchUserData} from "@/service/api";

const search = ref('')
let pageSize = 3
const currentPage = ref(1)
const userList = ref({
  data: [],
  page: 1,
  total: 0,
});
const loadUserData = async () => {
  const userData = await fetchUserData(currentPage.value, pageSize);
  if (userData) {
    userList.value.data = userData.records;
    userList.value.page = userData.page;
    userList.value.total = userData.total;
  }
};
onMounted(async () => {
  await loadUserData()
})

const onPreOnclick = async (page) => {
  currentPage.value--;
  await loadUserData()
  console.log("pre: ", page)
}
const onNextOnclick = async (page) => {
  currentPage.value++;
  await loadUserData()
  console.log("next: ", page)
}
const filterTableData = computed(() =>
    userList.value.data.filter(
        (data) =>
            !search.value ||
            data.username.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleEdit = (index: number, row: Type) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: Type) => {
  console.log(index, row)
}

const formatDate = (date: Date | string) => {
  // 如果传入的是字符串，将其转换为 Date 对象
  if (typeof date === 'string') {
    date = new Date(date);
  }

  // 检查 date 是否为有效的 Date 对象
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
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