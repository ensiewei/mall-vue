<template>
  <el-container>
    <el-aside width="30%">
      <category @node-click="handleNodeClick"></category>
    </el-aside>
    <el-main>
      <el-select v-model="value" clearable placeholder="请选择" @change="selectChange">
        <el-option
          v-for="sku in skus"
          :key="sku.skuTo.id"
          :label="sku.skuTo.spuName"
          :value="sku.skuTo.id"
        >
          <span style="float: left">{{ sku.skuTo.spuName }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px" v-for="group of sku.groupTOS" :key="group.groupId">{{ group.value ? '/' + group.value : '' }}</span>
        </el-option>
      </el-select>
      <div class="demo-image" style="margin-top: 10px">
        <div class="block" v-for="skuImg in skuImgs" :key="skuImg.id">
          <el-image
            :src="skuImg.img"
            style="width: 400px; height: 400px"
          ></el-image>
        </div>
      </div>
      <el-upload
        class="upload-demo"
        action="https://ensiewei-mall.oss-cn-hangzhou.aliyuncs.com/"
        :data="data"
        :on-error="err"
        :on-success="suc"
        :before-upload="beforeUpload"
        :show-file-list="false"
        style="margin-top: 10px"
        :disabled="value === undefined || value === ''"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <template #tip>
          <div class="el-upload__tip">
            只能上传 jpg/png 文件
          </div>
        </template>
      </el-upload>
    </el-main>
  </el-container>
</template>

<script>
import Category from "../components/Category.vue";
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      skus: [],
      value: undefined,
      data: {},
      skuImgs: [],
    };
  },
  components: {
    Category,
  },
  methods: {
    handleNodeClick(obj) {
      if (obj.categoryEntity.level === 3) {
        this.value = undefined
        this.skuImgs = []

        this.axios
          .get(
            "http://106.55.156.192:5797/api/commodity/sku/category/" +
              obj.categoryEntity.id
          )
          .then((response) => {
            this.skus = response.data.sku;
          })
          .catch((e) => console.log(e));
      }
    },
    selectChange(value) {
      this.fetchImgByskuId(value)
    },
    fetchImgByskuId(value) {
      if (Number.isInteger(value)) {
        this.axios
          .get("http://106.55.156.192:5797/api/commodity/sku-img/sku/" + value)
          .then((response) => {
            this.skuImgs = response.data.skuImgs;
          })
          .catch((e) => console.log(e));
      } 
    },
    err(err) {
      console.log(err);
    },
    suc() {
      this.$http({
        method: "post",
        url: "http://106.55.156.192:5797/api/commodity/sku-img/save",
        headers: { "Content-Type": "application/json" },
        data: {
          skuId: this.value,
          img: this.data.host + "/" + this.data.key,
        },
      })
        .then((res) => {
          if (res.data.code === 0) {
            this.fetchImgByskuId(this.value)
            alert("添加成功");
          } else {
            alert("保存失败");
          }
        })
        .catch((e) => {
          console.log(e);
          alert("保存失败");
        });
    },
    async beforeUpload(file) {
      await this.axios
        .get("http://106.55.156.192:5797/api/third-party/signature")
        .then((response) => {
          this.data = response.data.data;
          this.data.key =
            this.data.dir + uuidv4() + file.name.substr(file.name.indexOf("."));
          this.data.OSSAccessKeyId = this.data.accessid;
          console.log(this.data);
          return true;
        })
        .catch((e) => {
          console.log(e);
          return false;
        });
    },
  },
};
</script>

<style>
</style>
