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
      .get(`http://${window.location.hostname}:88/api/commodity/category/tree`)
      .then((res) => {
        this.data = res.data.category;
      })
      .catch((e) => console.log(e));
  },
};
</script>

<style>
</style>
