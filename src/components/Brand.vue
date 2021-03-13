<template>
  <el-table :data="tableData" border>
    <el-table-column prop="id" label="id"> </el-table-column>
    <el-table-column prop="name" label="名字"> </el-table-column>
    <el-table-column prop="categoryId" label="品类">
    </el-table-column>
    <el-table-column prop="sort" label="排序"> </el-table-column>
    <el-table-column prop="logo" label="logo"> </el-table-column>
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
      .get("http://localhost:88/api/commodity/brand/list")
      .then((response) => {
        this.tableData = response.data.page.list;
      })
      .catch((e) => console.log(e));
  },
};
</script>