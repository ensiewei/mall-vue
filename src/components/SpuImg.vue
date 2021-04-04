<template>
  <el-container>
    <el-aside width="30%">
      <category @node-click="handleNodeClick"></category>
    </el-aside>
    <el-main>
      <el-select v-model="value" clearable placeholder="请选择" @change="selectChange">
        <el-option
          v-for="spu in spus"
          :key="spu.id"
          :label="spu.name"
          :value="spu.id"
        >
        </el-option>
      </el-select>
      <div class="demo-image" style="margin-top: 10px">
        <div class="block" v-for="spuImg in spuImgs" :key="spuImg.id">
          <el-image
            :src="spuImg.img"
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
      spus: [],
      value: undefined,
      data: {},
      spuImgs: [],
    };
  },
  components: {
    Category,
  },
  methods: {
    handleNodeClick(obj) {
      if (obj.categoryEntity.level === 3) {
        this.value = undefined
        this.spuImgs = []

        this.axios
          .get(
            "http://localhost:88/api/commodity/spu/category/" +
              obj.categoryEntity.id
          )
          .then((response) => {
            this.spus = response.data.spu;
          })
          .catch((e) => console.log(e));
      }
    },
    selectChange(value) {
      this.fetchImgBySpuId(value)
    },
    fetchImgBySpuId(value) {
      if (Number.isInteger(value)) {
        this.axios
          .get("http://localhost:88/api/commodity/spu-img/spu/" + value)
          .then((response) => {
            this.spuImgs = response.data.spuImgs;
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
        url: "http://localhost:88/api/commodity/spu-img/save",
        headers: { "Content-Type": "application/json" },
        data: {
          spuId: this.value,
          img: this.data.host + "/" + this.data.key,
        },
      })
        .then((res) => {
          if (res.data.code === 0) {
            this.fetchImgBySpuId(this.value)
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
        .get("http://localhost:88/api/third-party/signature")
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
