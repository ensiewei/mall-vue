
<template>
  <el-container>
    <el-aside width="30%">
      <category @node-click="handleNodeClick"></category>
    </el-aside>
    <el-main>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="品类" prop="categoryId">
          <el-input v-model="categoryName" disabled placeholder="请在右侧选择品类"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即添加</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import Category from "../components/Category.vue";
export default {
  data() {
    return {
      categoryName: undefined,
      ruleForm: {
        categoryId: undefined,
        name: undefined,
      },
      rules: {
        categoryId: [{ required: true, message: "请选择品类", trigger: "blur" }],
        name: [{ required: true, message: "请填写名称", trigger: "blur" }],
      },
    };
  },
  components: {
    Category,
  },
  methods: {
    handleNodeClick(obj) {
      console.log(obj)
      if (obj.categoryEntity.level === 3) {
        this.ruleForm.categoryId = obj.categoryEntity.id;
        this.categoryName = obj.categoryEntity.name
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: `http://${window.location.hostname}:88/api/commodity/brand/add`,
            headers: { "Content-Type": "application/json" },
            data: {
              categoryId: this.ruleForm.categoryId,
              name: this.ruleForm.name,
            },
          })
            .then((res) => {
              if (res.data.code === 0) {
                alert("添加成功");
                // this.$refs[formName].resetFields();
              } else {
                alert("保存失败");
                return false;
              }
            })
            .catch((e) => {
              console.log(e);
              alert("保存失败");
              return false;
            });
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>
