<template>
  <div style="width: 100%">

    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
      <el-menu-item index="0">LOGO</el-menu-item>
      <div class="flex-grow"/>
      <el-menu-item index="1">搜索</el-menu-item>
      <el-sub-menu index="2">
        <template #title>我的</template>
        <el-menu-item index="2-1">个人中心</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>操作</template>
          <el-menu-item index="2-4-1">退出登录</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>

    <el-row class="tac">
      <el-col :span="3">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
        >
          <el-menu-item index="1" @click="navTo('/')">
            <el-icon>
              <House/>
            </el-icon>
            <span>欢迎</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Menu/>
              </el-icon>
              <span>管理</span>
            </template>
            <el-menu-item-group title="酒店">
              <el-menu-item index="1-1" @click="navTo('/hot/user')">
                <el-icon>
                  <UserFilled/>
                </el-icon>
                <span>用户管理</span>
              </el-menu-item>
              <el-menu-item index="1-2" @click="navTo('/hot/apartment')">
                <el-icon>
                  <HomeFilled/>
                </el-icon>
                <span>公寓管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

        </el-menu>
      </el-col>
      <el-col :span="20">
        <div id="content">
          <el-watermark :font="font">
            <router-view/>
          </el-watermark>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {reactive, watch} from 'vue'

const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
})

watch(
    () => {
      font.color = 'rgba(255, 255, 255, .15)'
    },
    {
      immediate: true,
    }
)
const router = useRouter();

const navTo = (path) => {
  router.push(path)
}

const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
}
const handleOpen = (index: string, indexPath: string[]) => {
  console.log(`Menu opened: ${index}`, indexPath);
};
const handleClose = (index: string, indexPath: string[]) => {
  console.log(`Menu closed: ${index}`, indexPath);
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}

#content {
  padding-left: 20px;
  padding-top: 20px;
}

</style>
