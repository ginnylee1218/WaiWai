<template>
  <div id="home">
    <div class="saleBanner">
      <div class="flexcenter">
        <div class="copybox text-center">   
          <h2>
            <span>週年</span>
            <span style="color:#d98e87;">歡</span>
            <span style="color:#557d87;">樂</span>
            <span style="color:#857b53;">慶</span> 
            <span class="pl-1"><i class="fas fa-gift" style="color:#6d0509;"></i></span>
          </h2>
          <p>輸入優惠券即可享 <span style="color:#d98e87;">7</span> 折優惠</p>
          <p>優惠券代碼 
            <span class="pr-1"><i class="fas fa-angle-left"></i></span>
            <span>H</span>
            <span style="color:#d98e87;">A</span>
            <span style="color:#557d87;">P</span>
            <span style="color:#857b53;">P</span>
            <span>Y</span>
            <span style="color:#d98e87;">7</span>
            <span class="pl-1"><i class="fas fa-angle-right"></i></span>
          </p>
        </div>
      </div>
    </div>
    <div class="banner">
      <swiper :options="swiperOption" class="h-100">
        <swiper-slide class="slide-1">
          <div class="content left">
            <div class="intro mb-4">
              <h5>GET COZY IN THIS WINTER</h5>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            </div>
            <div class="d-flex">
              <button class="btn btn-sm btn-outline-darktheme mr-3" @click.prevent="onClickCategory('gNew', 'girls')">SHOP GIRLS</button>
              <button class="btn btn-sm btn-outline-darktheme" @click.prevent="onClickCategory('bNew', 'boys')">SHOP BOYS</button>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="slide-2">
          <div class="content right">
            <div class="intro mb-4">
              <h5>GET COZY IN THIS WINTER</h5>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            </div>
            <div class="d-flex">
              <button class="btn btn-sm btn-outline-darktheme mr-3" @click.prevent="onClickCategory('gNew', 'girls')">SHOP GIRLS</button>
              <button class="btn btn-sm btn-outline-darktheme" @click.prevent="onClickCategory('bNew', 'boys')">SHOP BOYS</button>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="slide-3">
          <div class="content left">
            <div class="intro mb-4">
              <h5>GET COZY IN THIS WINTER</h5>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            </div>
            <div class="d-flex">
              <button class="btn btn-sm btn-outline-darktheme mr-3" @click.prevent="onClickCategory('gNew', 'girls')">SHOP GIRLS</button>
              <button class="btn btn-sm btn-outline-darktheme" @click.prevent="onClickCategory('bNew', 'boys')">SHOP BOYS</button>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>    
    <div class="full-parallax d-flex align-items-center justify-content-end p-5 bg-girl">
      <div class="intro text-white">
        <h2>BEAUTY AND LOVELY</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa corporis non exercitationem recusandae, corrupti quae</p>
        <button class="btn btn-sm btn-white btn-block" @click.prevent="onClickCategory('gDresses', 'girls')">SHOP GIRLS</button>
      </div>
    </div>
    <div class="two-tout">
       <div class="row">
          <div class="col-sm-6">
            <div class="two-tout-wrap bg-boy">
              <div class="text-wrap">
                <h2>All Kinds of Cozy</h2>
                <h5>Hot Sale!</h5>
                <button class="btn btn-sm btn-outline-darktheme" @click.prevent="onClickCategory('bSale', 'boys')">SHOP BOYS</button>
              </div>
            </div>
          </div>
          <div class="col-sm-6 mt-5 mt-sm-0">
            <div class="two-tout-wrap bg-girl">
              <div class="text-wrap">
                <h2>All Kinds of Cozy</h2>
                <h5>Hot Sale!</h5>
                <button class="btn btn-sm btn-outline-darktheme" @click.prevent="onClickCategory('gSale', 'girls')">SHOP GIRLS</button>
              </div>
            </div>
          </div>
        </div>
    </div>
   
    <div class="full-parallax d-flex align-items-center justify-content-start p-5 bg-boy">
      <div class="intro text-white">
        <h2>HANDSOME AND CHARMING</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa corporis non exercitationem recusandae, corrupti quae</p>
        <button class="btn btn-sm btn-white btn-block" @click.prevent="onClickCategory('bSweaters', 'boys')">SHOP BOYS</button>
      </div>
    </div>
      
    
  </div>
</template>

<script>
import $ from 'jquery';
export default {
    data() {
      return {
        swiperOption: {
          spaceBetween: 50,
          centeredSlides: true,
          loop: true,
          effect: 'fade',
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
        },
      }
    },
    methods: {
      onClickCategory(destId, Gender) {
        const vm = this;
        let genderStr = '/' + Gender;
        vm.$router.push({ path: genderStr, query: { id: destId }}).catch(err => {});
        vm.navShow = false;
        vm.$store.dispatch('updateNowPage' ,destId);
        
      },
    },
}
</script>


<style lang="scss" scoped>
  
</style>