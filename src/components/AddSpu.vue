
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
        <el-form-item label="brand" prop="brandId">
          <el-select v-model="ruleForm.brandId" placeholder="请选择brand">
            <el-option
              :label="brand.name"
              :value="brand.id"
              v-for="brand of brands"
              :key="brand.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="spu名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
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
      brands: [],
      ruleForm: {
        categoryId: undefined,
        brandId: undefined,
        name: undefined,
      },
      rules: {
        brandId: [{ required: true, message: "请选择brand", trigger: "blur" }],
        name: [{ required: true, message: "请填写名称", trigger: "blur" }],
      },
    };
  },
  components: {
    Category,
  },
  methods: {
    handleNodeClick(obj) {
      if (obj.categoryEntity.level === 3) {
        this.ruleForm.categoryId = obj.categoryEntity.id;
        this.ruleForm.brandId = undefined

        this.axios
          .get(
            "http://localhost:88/api/commodity/brand/category/" +
              obj.categoryEntity.id
          )
          .then((response) => {
            console.log(response)
            this.brands = response.data.brand;
          })
          .catch((e) => console.log(e));
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          this.$http({
            method: "post",
            url: "http://localhost:88/api/commodity/spu/save",
            headers: { "Content-Type": "application/json" },
            data: {
              categoryId: this.ruleForm.categoryId,
              brandId: this.ruleForm.brandId,
              name: this.ruleForm.name,
            },
          })
            .then((res) => {
              if (res.data.code === 0) {
                alert("添加成功");
                this.$refs[formName].resetFields();
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
