<template>
  <el-row :style="styleObject">
    <el-col :span="24 - 2 * offset" :offset="offset">
      <div class="grid-content bg-purple">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      styleObject: {
        "margin-top": "100px",
      },
      offset: 6,
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .get("http://localhost/api/test")
            .then(() => {
              this.$router.push({ name: "Home" });
            })
            .catch((e) => {
              console.log(e)
              alert('账号或密码出错')
              return false;
            });
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
  created() {
    this.$cookies.set('hello', 'world')
    this.offset = Number.parseInt(window.innerWidth / 200);
    this.styleObject["margin-top"] =
      Number.parseInt(window.innerHeight / 2 - 124) + "px";
    window.onresize = () => {
      this.offset = Number.parseInt(window.innerWidth / 200);
      this.styleObject["margin-top"] =
        Number.parseInt(window.innerHeight / 2 - 124) + "px";
    };
  },
};
</script>

<style>
</style>
