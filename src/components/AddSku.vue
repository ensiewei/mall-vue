
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
        class="demo-ruleForm"
      >
        <el-form-item label="已选择品类">
          <el-input v-model="categoryName" disabled></el-input>
        </el-form-item>
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
          <el-button type="primary" @click="defaultTitle()">默认标题</el-button>
        </el-form-item>
        <el-form-item label="价格" required prop="price" v-if="ruleForm.spu !== undefined && ruleForm.spu !== ''">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="数量" required prop="count" v-if="ruleForm.spu !== undefined && ruleForm.spu !== ''">
          <el-input v-model="ruleForm.count"></el-input>
        </el-form-item>
        <el-form-item
          :label="group.kind === 1 ? group.name + ' - [销售属性]' : group.name"
          :prop="group.name"
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
      categoryName: undefined,
      spus: [],
      groups: [],
      ruleForm: {
        spu: undefined,
        categoryId: undefined,
        price: undefined,
        title: undefined,
        count: undefined,
        groups: [],
      },
      rules: {
        spu: [{ required: true, message: "请选择spu", trigger: "blur" }],
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
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
        this.categoryName = obj.categoryEntity.name

        this.axios
          .get(
            `http://${window.location.hostname}:88/api/commodity/group/category/` +
              obj.categoryEntity.id
          )
          .then((response) => {
            this.groups = response.data.group;
            this.ruleForm.groups = response.data.group;
          })
          .catch((e) => console.log(e));

        this.axios
          .get(
            `http://${window.location.hostname}:88/api/commodity/spu/category/` +
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
            url: `http://${window.location.hostname}:88/api/commodity/sku/add`,
            headers: { "Content-Type": "application/json" },
            data: {
              spuId: this.ruleForm.spu,
              categoryId: this.ruleForm.categoryId,
              price: this.ruleForm.price * 100,
              title: this.ruleForm.title,
              count: this.ruleForm.count,
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
        } else {
          return false;
        }
      });
    },
    defaultTitle () {
      let title = this.categoryName + ' '
      for (const spu of this.spus) {
        if (spu.id === this.ruleForm.spu) title += spu.name
      }
      for (const group of this.ruleForm.groups) {
        if (group.value && group.value.length < 10) title += ' ' + group.value
      }
      this.ruleForm.title = title
    }
  },
};
</script>

<style>
</style>
