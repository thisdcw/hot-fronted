<template>
  <h3>公寓列表</h3>
  <ApartmentTableLayout
      :pageSize="pageSize"
      :filterTableData="filterTableData"
      :next-onclick="onNextOnclick"
      :pre-onclick="onPreOnclick"
      :filter-tag="filterTag"
      :handle-type="handleType"
      :formatDate="formatDate"
      :on-page-change="onPageChange"
  />
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue'
import {fetchApartmentData} from "@/service/api";
import {API} from "@/model/Type";
import ApartmentTableLayout from "@/layouts/ApartmentTableLayout.vue";
import {mockApartment} from "@/mock/mock";
import {formatDate} from "@/utils/DateUtils";

const apartments: API.PageResponse<API.Apartment> = mockApartment

let pageSize = 3
const search = ref('')
const currentPage = ref(1)

const apartmentList = ref({} as API.PageResponse<API.Apartment>);

const getApartmentList = async () => {
  // const data = await fetchApartmentData(currentPage.value, pageSize)
  const data = apartments;
  if (data) {
    apartmentList.value = data;
  }
}

onMounted(() => {
  getApartmentList();
})

const filterTag = (value: number, row: any) => {
  return row.type === value;
}
const filterTableData = computed(() => {
  if (apartmentList.value && apartmentList.value.records) {
    return apartmentList.value.records.filter(
        (record) =>
            !search.value ||
            record.apartmentName.toLowerCase().includes(search.value.toLowerCase())
    );
  } else {
    return [];
  }
});
const onPreOnclick = async (page: number) => {
  currentPage.value--;
  await getApartmentList()
  console.log("pre: ", page)
}
const onNextOnclick = async (page: number) => {
  currentPage.value++;
  await getApartmentList()
  console.log("next: ", page)
}


const onPageChange = async (page: number) => {
  currentPage.value = page;
  console.log(page)
  await getApartmentList()
}

const handleType = (type: number) => {
  return type == 1 ? '月租' : type == 1 ? '日租' : '混合'
}
</script>

<style scoped>

</style>