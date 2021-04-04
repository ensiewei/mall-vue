
<template>
  <el-container>
    <el-aside width="30%">
      <category @node-click="handleNodeClick"></category>
    </el-aside>
    <el-main>
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="name" label="名字"> </el-table-column>
        <el-table-column prop="brand" label="品牌"> </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import Category from "../components/Category.vue";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  components: {
    Category,
  },
  methods: {
    handleNodeClick(obj) {
      if (obj.categoryEntity.level === 3) {
        this.axios
          .get("http://106.55.156.192:5797/api/commodity/spu/category/" + obj.categoryEntity.id)
          .then((response) => {
            this.tableData = response.data.spu;
          })
          .catch((e) => console.log(e));
      }
    },
  },
};
</script>

<style>
</style>
