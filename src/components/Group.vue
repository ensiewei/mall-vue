
<template>
  <el-container>
    <el-aside width="30%">
      <category @node-click="handleNodeClick"></category>
    </el-aside>
    <el-main>
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="name" label="名字"> </el-table-column>
      </el-table>
      <el-row style="margin-top: 10px" v-if="categoryId">
        <el-input v-model="groupName" placeholder="请输入属性名" style="width: 300px"></el-input>
        <el-button type="primary" style="margin-left: 10px" @click="addGroup">添加</el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import Category from "../components/Category.vue";
export default {
  data() {
    return {
      categoryId: undefined,
      groupName: undefined,
      tableData: [],
    };
  },
  components: {
    Category,
  },
  methods: {
    handleNodeClick(obj) {
      if (obj.categoryEntity.level === 3) {
        this.categoryId = obj.categoryEntity.id
        this.getGroup(obj.categoryEntity.id)
      }
    },
    getGroup(id) {
      this.axios
          .get("http://localhost:88/api/commodity/group/category/" + id)
          .then((response) => {
            this.tableData = response.data.group;
          })
          .catch((e) => console.log(e));
    },
    addGroup() {
      this.$http({
            method: "post",
            url: "http://localhost:88/api/commodity/group/save",
            headers: { "Content-Type": "application/json" },
            data: {
              categoryId: this.categoryId,
              name: this.groupName,
            },
          })
            .then((res) => {
              if (res.data.code === 0) {
                alert("添加成功");
                this.getGroup(this.categoryId)
                this.groupName = undefined
              } else {
                alert("保存失败");
              }
            })
            .catch((e) => {
              console.log(e);
              alert("保存失败");
            });
    }
  },
};
</script>

<style>
</style>
