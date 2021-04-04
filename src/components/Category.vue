<template>
  <el-tree
    :data="data"
    :props="defaultProps"
    accordion
  ></el-tree>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: (data) => data.categoryEntity.name,
      },
    };
  },
  beforeCreate() {
    this.$http
      .get("http://106.55.156.192:5797/api/commodity/category/tree")
      .then((res) => {
        this.data = res.data.category;
      })
      .catch((e) => console.log(e));
  },
};
</script>

<style>
</style>
