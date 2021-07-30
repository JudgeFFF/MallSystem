<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <div class="login-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />

      <div class="login-button">
        <van-button
          type="primary"
          @click="axiosLoginUser"
          :loading="openLoading"
          size="large"
          >登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/serviceAPI.config";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false, //是否开启用户的Loading
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    axiosLoginUser() {
      axios({
        url: api.loginUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password,
        },
      })
        .then((response) => {
          console.log(response);
          //如果返回code为200，代表注册成功，我们给用户作Toast提示
          if (response.data.code == 200) {
            Toast.success("登录成功");
            this.$router.push("/");
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.username };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch((err) => {
                Toast.fail("登录状态保存失败");
                console.log(err);
              });
          } else {
            console.log(response.data.message);
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch((error) => {
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    },
  },
  created() {
    if (localStorage.userInfo) {
      Toast.success("您已经登录");
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.login-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.login-button {
  padding-top: 10px;
}
</style>