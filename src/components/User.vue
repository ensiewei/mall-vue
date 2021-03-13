<template>
  <el-table :data="tableData" border>
    <el-table-column prop="id" label="id"> </el-table-column>
    <el-table-column prop="name" label="名字"> </el-table-column>
    <el-table-column prop="account" label="账号"></el-table-column>
    <el-table-column prop="role" label="角色"> </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      :formatter="(row, column) => (row.status === 0 ? '正常' : '异常')"
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  beforeCreate() {
    this.axios
      .get("http://localhost:88/api/backstage/user/list")
      .then((response) => {
        this.tableData = response.data.page.list;
      })
      .catch((e) => console.log(e));
  },
};
</script>