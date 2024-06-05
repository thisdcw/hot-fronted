<template>
  <div id="title">
    <h2>用户列表</h2>
    <el-button type="primary" @click="addUser">添加用户</el-button>
  </div>
  <TableLayout
      :pageSize="pageSize"
      :filterTableData="filterTableData"
      :next-onclick="onNextOnclick"
      :pre-onclick="onPreOnclick"
      :handle-delete="handleDelete"
      :handle-edit="handleEdit"
      :formatDate="formatDate"
      :on-page-change="onPageChange"
  />
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue'
import {fetchUserData} from "@/service/api";
import {API} from "@/model/Type"
import TableLayout from "@/layouts/UserTableLayout.vue";
import {mock} from "@/mock/mock";
import {formatDate} from "@/utils/DateUtils";

const users: API.PageResponse<API.User> = mock;

let pageSize = 3;
const search = ref('')
const currentPage = ref(1)
const userList = ref({} as API.PageResponse<API.User>);

const loadUserData = async () => {
  // const userData = await fetchUserData(currentPage.value, pageSize);
  const userData = users;
  if (userData) {
    userList.value = userData;
  }
};
onMounted(() => {
  loadUserData()
})

const onPreOnclick = async (page: number) => {
  currentPage.value--;
  await loadUserData()
  console.log("pre: ", page)
}
const onNextOnclick = async (page: number) => {
  currentPage.value++;
  await loadUserData()
  console.log("next: ", page)
}

const filterTableData = computed(() => {
  if (userList.value && userList.value.records) {
    return userList.value.records.filter(
        (record) =>
            !search.value ||
            record.username.toLowerCase().includes(search.value.toLowerCase())
    );
  } else {
    return [];
  }
});
const handleEdit = (index: number, row: API.User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: API.User) => {
  console.log(index, row)
}
const onPageChange = async (page: number) => {
  currentPage.value = page;
  console.log(page)
  await loadUserData()
}

const addUser = () => {

}
</script>

<style scoped>
#title {
  margin-bottom: 10px;
}
</style>