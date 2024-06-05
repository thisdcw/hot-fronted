<template>
  <h3>公寓列表</h3>
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
        @prev-click="onPreOnclick"
        @next-click="onNextOnclick"
        @current-change="onPageChange"
        :total="apartments.total">
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue'
import {fetchApartmentData} from "@/service/api";
import {API} from "@/model/Type";


const search = ref('')
let pageSize = 3
const currentPage = ref(1)
const apartments = ref({
  data: [] as API.Apartment,
  page: 1,
  total: 0,
});

const getApartmentList = async () => {
  const data = await fetchApartmentData(currentPage.value, pageSize)
  if (data) {
    apartments.value.data = data.records;
    apartments.value.page = data.page;
    apartments.value.total = data.total;
  }
}

onMounted(() => {
  getApartmentList();
})
const filterTag = (value, row) => {
  return row.type === value;
}
const filterTableData = computed(() =>
    apartments.value.data.filter(
        (data) =>
            !search.value ||
            data.username.toLowerCase().includes(search.value.toLowerCase())
    )
)
const onPreOnclick = async (page) => {
  currentPage.value--;
  await getApartmentList()
  console.log("pre: ", page)
}
const onNextOnclick = async (page) => {
  currentPage.value++;
  await getApartmentList()
  console.log("next: ", page)
}


const onPageChange = async (page: number) => {
  currentPage.value = page;
  await getApartmentList()
}

const handleType = (type: number) => {
  return type == 1 ? '月租' : type == 1 ? '日租' : '混合'
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

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

</style>