<template>
  <div class="body">
    <div class="search-bar">
      <van-row>
        <van-col span="4">
          <img :src="locationIcon" class="location-icon">
        </van-col>
        <van-col span="15">
          <input type="text" class="search-input"></input>
        </van-col>
        <van-col span="5">
          <div class="search-button">
            <van-button size="mini">查找</van-button>
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="swiper-area">
      <!-- <van-swipe :autoplay="1000">
          <van-swipe-item v-for="index in bannerPicArray" :key="index">
              <img v-lazy="index" width="100%"/>
          </van-swipe-item>
      </van-swipe> -->
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
            <img v-lazy="banner.image" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index" >
        <img v-lazy="cate.image" width="90%"/>
        <span>{{cate.mallCategoryName}}</span> 
      </div>
    </div>

    <div class="ad-banner">
        <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>

    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- <swiper-default></swiper-default> -->
    <!-- <swiper-dot></swiper-dot> -->
    <!-- <swiper-vertical></swiper-vertical> -->
    <!-- <swiper-rollback></swiper-rollback> -->

    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>

    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
            <van-row gutter="20">
                <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                    <goodsInfoComponent :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfoComponent>
                </van-col>
            </van-row>
        </van-list>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
// import SwiperDefault from '@/components/swiper/SwiperDefault'
// import SwiperDot from '@/components/swiper/SwiperDot'
// import SwiperVertical from '@/components/swiper/SwiperVertical'
// import SwiperRollback from '@/components/swiper/SwiperRollback'
import floorComponent from "@/components/component/floorComponent";
import { toMoney } from "@/filter/moneyFilter.js";
import goodsInfoComponent from "@/components/component/goodsInfoComponent";
import api from "@/serviceAPI.config";
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
      },
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [], //轮播图片
      category: [], //商品类别标签栏
      adBanner: "", //广告图片
      recommendGoods: [], //推荐商品
      floor1: [], //楼层1的数据
      floor2: [], //楼层2的数据
      floor3: [], //楼层3的数据
      floorName: {}, //楼层名称
      hotGoods: [], //热卖商品
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    // SwiperDefault,
    // SwiperDot,
    // SwiperVertical,
    // SwiperRollback
    floorComponent,
    goodsInfoComponent,
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    },
  },
  created() {
    axios({
      url: api.getShoppingMallInfo,
      method: "get",
    })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture; //获得广告图片
          this.bannerPicArray = response.data.data.slides; //轮播图片
          this.recommendGoods = response.data.data.recommend; //推荐商品
          this.floor1 = response.data.data.floor1; //楼层1数据
          this.floor2 = response.data.data.floor2; //楼层2数据
          this.floor3 = response.data.data.floor3; //楼层3数据
          this.floorName = response.data.data.floorName; //楼层名称
          this.hotGoods = response.data.data.hotGoods; //热卖商品
        }
      })
      .catch((error) => {});
  },
};
</script>

<style scoped>
.body {
  background-color: cornflowerblue;
}
.search-bar {
  height: 2.2rem;
  background-color: cornflowerblue;
  line-height: 2.2rem;
  overflow: hidden;
}
.location-icon {
  width: 50%;
  padding-top: 0.3rem;
  padding-left: 0.7rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff !important ;
  background-color: cornflowerblue;
  color: #fff;
}
.search-button {
  margin-top: -0.3rem;
  margin-left: 1.2rem;
}
.swiper-area {
  overflow: hidden;
  clear: both;
  max-height: 14rem;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.5rem;
  font-size: 12px;
  text-align: center;
}
.recommend-area {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  text-align: center;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
  margin-bottom: -1rem;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  margin-top: 0.5rem;
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
</style>