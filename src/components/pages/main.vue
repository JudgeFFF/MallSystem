<template>
  <div>
    <div class="main-div">
      <router-view />
    </div>

    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">商品列表</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    changeTabbar(active) {
      console.log(active);
      switch (active) {
        case 0:
          this.$router.push({ name: "index" });
          break;
        case 1:
          this.$router.push({ name: "categoryList" });
          break;
        case 2:
          this.$router.push({ name: "cart" });
          break;
        case 3:
          break;
      }
    },
    changeTabBarActive() {
      this.nowPath = this.$route.path;
      if (this.nowPath == "/Cart") {
        this.active = 2;
      }
    },
  },
  created() {
    this.changeTabBarActive();
  },
};
</script>

<style scoped>
</style>