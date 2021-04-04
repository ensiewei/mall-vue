
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
        <el-form-item label="spu" prop="spu">
          <el-select v-model="ruleForm.spu" placeholder="请选择spu" clearable>
            <el-option
              :label="spu.name + ' (' + spu.brand + ')'"
              :value="spu.id"
              v-for="spu of spus"
              :key="spu.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title" v-if="ruleForm.spu !== undefined && ruleForm.spu !== ''">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price" v-if="ruleForm.spu !== undefined && ruleForm.spu !== ''">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item
          :label="group.name"
          prop="name"
          v-for="(group, index) of groups"
          :key="index"
        >
          <el-input v-model="ruleForm.groups[index].value"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
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
      spus: [],
      groups: [],
      ruleForm: {
        spu: undefined,
        categoryId: undefined,
        price: undefined,
        title: undefined,
        groups: [],
      },
      rules: {
        spu: [{ required: true, message: "请选择spu", trigger: "blur" }],
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
        this.ruleForm.spu = undefined

        this.axios
          .get(
            "http://106.55.156.192:5797/api/commodity/group/category/" +
              obj.categoryEntity.id
          )
          .then((response) => {
            this.groups = response.data.group;
            this.ruleForm.groups = response.data.group;
          })
          .catch((e) => console.log(e));

        this.axios
          .get(
            "http://106.55.156.192:5797/api/commodity/spu/category/" +
              obj.categoryEntity.id
          )
          .then((response) => {
            this.spus = response.data.spu;
          })
          .catch((e) => console.log(e));
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: "http://106.55.156.192:5797/api/commodity/sku/add",
            headers: { "Content-Type": "application/json" },
            data: {
              spuId: this.ruleForm.spu,
              categoryId: this.ruleForm.categoryId,
              price: this.ruleForm.price,
              title: this.ruleForm.title,
              groupDTOs: this.ruleForm.groups,
            },
          })
            .then((res) => {
              if (res.data.code === 0) {
                alert("添加成功");
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
  },
};
</script>

<style>
</style>
