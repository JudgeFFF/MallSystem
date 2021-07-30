<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>

    <div class="tab-div">
      <van-tabs>
        <van-tab
          v-for="(item, index) in category"
          :key="index"
          :title="item.MALL_CATEGORY_NAME"
          @click="onclickCategory(categoryId)"
        >
        </van-tab>
      </van-tabs>
    </div>

    <div class="rowcol-div">
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                v-for="(item, index) in categorySub"
                :key="index"
                @click="onclickCategorySub(index)"
                :class="{ categorySubActive: categorySubIndex == index }"
              >
                {{ item.MALL_SUB_NAME }}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div
                  class="list-item"
                  v-for="(item, index) in goodList"
                  :key="index"
                >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                  </div>
                  <div class="list-item-text">
                    <div>{{ item.NAME }}</div>
                    <div class="">￥{{ item.ORI_PRICE | moneyFilter }}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/serviceAPI.config.js";
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      category: [],
      categorySub: [],
      categorySubIndex: 0,
      loading: false, //上拉加载使用
      finished: false, //下拉加载是否没有数据了
      isRefresh: false, //下拉加载
      page: 1, //商品列表的页数
      goodList: [], //商品信息
      categorySubId: "", //商品子分类ID
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"', //错误图片显示路径
    };
  },
  methods: {
    getCategory() {
      axios({
        url: api.getCategoryList,
        method: "get",
      })
        .then((response) => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            this.getCategorySub(this.category[0].ID);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCategorySub(categoryId) {
      axios({
        url: api.getCategorySubList,
        method: "post",
        data: { categoryId: categoryId },
      })
        .then((response) => {
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.active = 0;
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGoodList() {
      axios({
        url: api.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.code == 200 && response.data.message.length) {
            this.page++;
            this.goodList = this.goodList.concat(response.data.message);
          } else {
            this.finished = true;
          }
          this.loading = false;
          console.log(this.finished);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onclickCategory(categoryId) {
      this.getCategorySub(categoryId);
      console.log(this.categoryId);
      this.page = 1;
      this.finished = false;
      this.goodList = [];
    },
    onclickCategorySub(index) {
      this.categorySubIndex = index;
      this.categorySubId = this.categorySub[index].ID;
      console.log(this.categorySubId);
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page = 1;
        this.onLoad();
      }, 500);
    },
  },
  created() {
    this.getCategory();
    this.getCategorySub();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 - 50 + "px";
    document.getElementById("list-div").style.height = winHeight - 90 - 50 + "px";
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
};
</script>

<style scoped>
.categorySubActive {
  background-color: #fff;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>