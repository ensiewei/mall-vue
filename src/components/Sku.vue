<template>
  <el-container>
    <el-aside width="30%">
      <category @node-click="handleNodeClick"></category>
    </el-aside>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-form label-position="left" inline class="demo-table-expand" v-if="row.skuTo">
              <el-form-item :label="groupTo.name" v-for="groupTo of row.groupTOS" :key="groupTo.groupId">
                <span>{{ groupTo.value || '其它' }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="id" prop="skuTo.id"> </el-table-column>
        <el-table-column label="spu 名称" prop="skuTo.spuName">
        </el-table-column>
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
      group: [],
    };
  },
  methods: {
    handleNodeClick(obj) {
      if (obj.categoryEntity.level === 3) {
        this.axios
          .get(
            "http://106.55.156.192:5797/api/commodity/sku/category/" +
              obj.categoryEntity.id
          )
          .then((response) => {
            this.tableData = response.data.sku;
          })
          .catch((e) => console.log(e));
      }
    },
  },
  components: {
    Category,
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
