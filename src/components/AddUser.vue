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
          <el-form-item label="用户名" prop="name">
            <el-input
              type="text"
              v-model="ruleForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <el-input
              type="text"
              v-model="ruleForm.account"
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
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      styleObject: {
        "margin-top": "100px",
      },
      offset: 6,
      ruleForm: {
        name: "",
        account: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: "http://localhost:88/api/backstage/user/save",
            headers: { "Content-Type": "application/json" },
            data: {
              name: this.ruleForm.name,
              account: this.ruleForm.account,
              password: this.ruleForm.pass,
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
    this.offset = Number.parseInt(window.innerWidth / 200);
    this.styleObject["margin-top"] =
      Number.parseInt(window.innerHeight / 2 - 144) + "px";
    window.onresize = () => {
      this.offset = Number.parseInt(window.innerWidth / 200);
      this.styleObject["margin-top"] =
        Number.parseInt(window.innerHeight / 2 - 144) + "px";
    };
  },
};
</script>

<style>
</style>
