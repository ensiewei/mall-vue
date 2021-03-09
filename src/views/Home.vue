<template>
  <el-container :style="styleObject">
    <el-aside width="20%" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '2', '3']">
        <el-submenu index="1">
          <template #title><i class="el-icon-message"></i>导航一</template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template #title><i class="el-icon-menu"></i>导航二</template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template #title>选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template #title><i class="el-icon-setting"></i>导航三</template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template #title>选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
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
        <el-table :data="tableData" border>
          <el-table-column prop="id" label="id" width="140">
          </el-table-column>
          <el-table-column prop="name" label="名字" width="120">
          </el-table-column>
          <el-table-column prop="categoryId" label="品类" width="120">
          </el-table-column>
          <el-table-column prop="sort" label="排序" width="120">
          </el-table-column>
          <el-table-column prop="logo" label="logo">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        styleObject: {
          height: '900px',
          border: "1px solid #eee"
        }
      }
    },
    beforeCreate() {
      this.axios.get('http://localhost:88/api/commodity/brand/list')
        .then((response) => {
          this.tableData = response.data.page.list
        })
        .catch(e => console.log(e))
    },
    mounted() {
      this.styleObject.height = window.innerHeight -16 + 'px'
      window.onresize = () => {
        this.styleObject.height = window.innerHeight -16 + 'px'
      }
        
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
