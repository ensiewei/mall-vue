<template>
  <el-container>
    <el-aside width="30%">
      <category @node-click="handleNodeClick"></category>
    </el-aside>
    <el-main>
      <el-form>
        <el-form-item label="已选择品类">
          <el-input v-model="categoryName" disabled></el-input>
        </el-form-item>
        <el-form-item label="sku">
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="sku in skus"
              :key="sku.skuTo.id"
              :label="sku.skuTo.spuName"
              :value="sku.skuTo.id"
              @click="changeSku(sku)"
            >
              <span style="float: left">{{ sku.skuTo.spuName }}</span>
              <span
                style="float: right; color: #8492a6; font-size: 13px"
                v-for="group of sku.groupTOS"
                :key="group.groupId"
                >{{ group.value ? "/" + group.value : "" }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        class="demo-ruleForm"
        v-if="ruleForm.sku"
        style="margin-top: 10px"
      >
        <el-form-item
          :label="group.kind === 1 ? group.name + ' - [销售属性]' : group.name"
          :prop="group.name"
          v-for="(group, index) of ruleForm.sku.groupTOS"
          :key="index"
        >
          <el-input v-model="group.value"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="ruleForm.sku.skuTo.price"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="count">
          <el-input v-model="ruleForm.sku.skuTo.count"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.sku.skuTo.title"></el-input>
          <el-button type="primary" @click="defaultTitle()">默认标题</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import Category from "./Category.vue";
export default {
  data() {
    return {
      categoryName: '请先选择左侧的品类',
      skus: [],
      value: undefined,
      ruleForm: {
        sku: undefined,
        categoryId: undefined,
        price: undefined,
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
        this.ruleForm.sku = undefined
        this.value = undefined
        this.categoryName = obj.categoryEntity.name

        this.axios
          .get(
            `http://${window.location.hostname}:88/api/commodity/sku/category/` +
              obj.categoryEntity.id
          )
          .then((response) => {
            this.skus = response.data.sku;
            for (const sku of this.skus) {
              sku.skuTo.price /= 100
            }
          })
          .catch((e) => console.log(e));
      }
    },
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.sku.skuTo.price *= 100
          this.$http({
            method: "post",
            url: `http://${window.location.hostname}:88/api/commodity/sku/modify`,
            headers: { "Content-Type": "application/json" },
            data: {
              skuTo: this.ruleForm.sku.skuTo,
              groupTOS: this.ruleForm.sku.groupTOS,
            },
          })
            .then((res) => {
              this.ruleForm.sku.skuTo.price /= 100
              if (res.data.code === 0) {
                alert("添加成功");
              } else {
                console.log(res)
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
    changeSku(sku) {
      this.ruleForm.sku = sku
    },
    defaultTitle () {
      let title = this.categoryName + ' ' + this.ruleForm.sku.skuTo.spuName
      for (const group of this.ruleForm.sku.groupTOS) {
        if (group.value && group.value.length < 10) title += ' ' + group.value
      }
      this.ruleForm.sku.skuTo.title = title
    }
  },
};
</script>

<style>
</style>
