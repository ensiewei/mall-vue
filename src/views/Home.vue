<template>
  <el-container :style="styleObject">
    <el-aside width="20%" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '2', '3']">
        <el-submenu index="1">
          <template #title><i class="el-icon-s-goods"></i>商品</template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="currentComponent = 'Category'">品类</el-menu-item>
            <el-menu-item index="1-2" @click="currentComponent = 'Group'">属性</el-menu-item>
            <el-submenu index="1-3">
              <template #title>品牌</template>
              <el-menu-item index="1-3-1" @click="currentComponent = 'AddBrand'">增加</el-menu-item>
              <el-menu-item index="1-3-2">删除</el-menu-item>
              <el-menu-item index="1-3-3">修改</el-menu-item>
              <el-menu-item index="1-3-4" @click="currentComponent = 'Brand'">查询</el-menu-item>
            </el-submenu>
            <el-submenu index="1-4">
              <template #title>spu</template>
              <el-menu-item index="1-4-1" @click="currentComponent = 'AddSpu'">增加</el-menu-item>
              <el-menu-item index="1-4-2">删除</el-menu-item>
              <el-menu-item index="1-4-3">修改</el-menu-item>
              <el-menu-item index="1-4-4" @click="currentComponent = 'Spu'">查询</el-menu-item>
            </el-submenu>
            <el-submenu index="1-5">
              <template #title>sku</template>
              <el-menu-item index="1-5-1" @click="currentComponent = 'AddSku'">增加</el-menu-item>
              <el-menu-item index="1-5-2">删除</el-menu-item>
              <el-menu-item index="1-5-3" @click="currentComponent = 'ModifySku'">修改</el-menu-item>
              <el-menu-item index="1-5-4" @click="currentComponent = 'Sku'">查询</el-menu-item>
            </el-submenu>
            <el-submenu index="1-6">
              <template #title>图片</template>
              <el-menu-item index="1-6-1" @click="currentComponent = 'SpuImg'">spu</el-menu-item>
              <el-menu-item index="1-6-2" @click="currentComponent = 'SkuImg'">sku</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template #title><i class="el-icon-s-order"></i>订单</template>
          <el-menu-item index="2-1">增加</el-menu-item>
          <el-menu-item index="2-2">删除</el-menu-item>
          <el-menu-item index="2-3">修改</el-menu-item>
          <el-menu-item index="2-4">查询</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template #title><i class="el-icon-user-solid"></i>用户</template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="currentComponent = 'AddUser'">增加</el-menu-item>
              <el-menu-item index="3-2">删除</el-menu-item>
              <el-menu-item index="3-3">修改</el-menu-item>
              <el-menu-item index="3-4" @click="currentComponent = 'User'">查询</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 14px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <component :is="currentTabComponent"></component>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { defineAsyncComponent } from 'vue'
  export default {
    data() {
      return {
        styleObject: {
          height: '900px',
          border: "1px solid #eee"
        },
        currentComponent: ''
      }
    },
    mounted() {
      this.styleObject.height = window.innerHeight -16 + 'px'
      window.onresize = () => {
        this.styleObject.height = window.innerHeight -16 + 'px'
      }
    },
    computed: {
      currentTabComponent() {
        return this.currentComponent || 'Brand'
      }
    },
    components: {
      Category: defineAsyncComponent(() => import('../components/Category.vue')),
      Brand: defineAsyncComponent(() => import('../components/Brand.vue')),
      User: defineAsyncComponent(() => import('../components/User.vue')),
      AddUser: defineAsyncComponent(() => import('../components/AddUser.vue')),
      Spu: defineAsyncComponent(() => import('../components/Spu.vue')),
      Group: defineAsyncComponent(() => import('../components/Group.vue')),
      Sku: defineAsyncComponent(() => import('../components/Sku.vue')),
      AddSku: defineAsyncComponent(() => import('../components/AddSku.vue')),
      AddSpu: defineAsyncComponent(() => import('../components/AddSpu.vue')),
      AddBrand: defineAsyncComponent(() => import('../components/AddBrand.vue')),
      SpuImg: defineAsyncComponent(() => import('../components/SpuImg.vue')),
      SkuImg: defineAsyncComponent(() => import('../components/SkuImg.vue')),
      ModifySku: defineAsyncComponent(() => import('../components/ModifySku.vue')),
      
    }
  };
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
