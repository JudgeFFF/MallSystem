<template>
  <div >
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide class="text">
            <div class="centent">
               一大堆文章.........
            </div>
        </swiper-slide>

      </swiper>
  </div>
</template>

<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/swiper-bundle.css'
    export default {
        data() {
            return {
                swiperOption:{
                    direction:'vertical',
                    slidesPerView: 'auto',
                    freeMode:true,
                    mousewheel:true,
                    loop:true,
                    pagination:{
                        el:'.swiper-pagination',
                        clickable:true
                    },
                }
            }
        },
        components:{
          Swiper,
          SwiperSlide
        },
    }
</script>

<style scoped>
  .swiper{
      height: 300px;
      overflow: hidden;
  }
  .text{
      font-size: 18px !important;
      text-align: left;
      padding:30px;
      height: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;

  }
</style>