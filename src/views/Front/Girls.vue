<template>
  <div id="girls">
    <div class="category-header mb-5">
      <h4>Girls / {{ getSubCategory }}</h4>
      <swiper :options="swiperOption2" class="h-100">
        <swiper-slide class="slide-g1"></swiper-slide>
        <swiper-slide class="slide-g2"></swiper-slide>
        <swiper-slide class="slide-g3"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    
    <div class="row pt-5">
      <div class="col-md-2 d-none d-md-block">
        <ul class="category ml-3 ml-lg-5">
          <li>
            <a href="#" id="gNew" @click.prevent="onClickCategory('gNew')" 
            :class="{'active': getNowPage == 'gNew'}">
            <i class="fas fa-gift"></i>
            New Arrivals
            </a>
          </li>
          <li>
            <div class="mainTitle"><i class="fas fa-tshirt"></i> Tops</div>
            <ul class="category-level-2 ml-4">
              <li class="list-item" v-for="(item,index) in girlsTops" :key="item.index">
                  <a :id="item.id" href="#" @click.prevent="onClickCategory(item.id)" :class="{'active': getNowPage == (item.id)}">
                  {{item.name}}
                  </a>
              </li>
            </ul>
          </li>
          <li>
            <div class="mainTitle"><i class="fas fa-socks"></i> Bottoms</div>
            <ul class="category-level-2 ml-4">
              <li class="list-item" v-for="(item,index) in girlsBottoms" :key="item.index">
                  <a :id="item.id" href="#" @click.prevent="onClickCategory(item.id)" :class="{'active': getNowPage == (item.id)}">
                  {{item.name}}
                  </a>
              </li>
            </ul>
          </li>
          <li>
          <a href="#" id="gSale" @click.prevent="onClickCategory('gSale')" :class="{'active': getNowPage == 'gSale'}"><i class="fas fa-smile-wink"></i> Sale</a>
          </li>
        </ul>
      </div>
      <div class="col-md-10 col-12">
        <div class="row px-5 pl-md-0">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="product in filterProducts" :key="product.id">
            <div class="item">
              <div class="item__images">
                <a @click.prevent="goProductDetail(product.id)" class="img-link" :style="{background: `url(${product.imageUrl}) center center no-repeat`,
                backgroundSize: 'cover'}"></a>
                <a href="#" class="quickViewBtn" @click.prevent="openQuickViewModal(product)">
                  <span class="text">Quickview</span>
                </a>
              </div>
              <div class="item__info">
                  <ul class="item__size">
                    <li>
                      <a href="#" @click.prevent="goProductDetail( product.id, 'S')">
                          <span>S</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" @click.prevent="goProductDetail( product.id, 'M')">
                          <span>M</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" @click.prevent="goProductDetail( product.id, 'L')">
                          <span>L</span>
                      </a>
                    </li>
                  </ul>
                  <p class="item__name">
                    <a href="#" @click.prevent="goProductDetail( product.id)">
                        {{ product.title}}
                    </a>
                  </p>
                  <p class="item__price">
                    <span class="item__old-price" v-if=" getSubCategory == 'Sale' ">{{ product.origin_price | currency }}</span>
                    <span>{{ product.price | currency }}</span>
                  </p>
              </div>
            </div>
          </div>
        </div> 
         
      </div>

    </div>
    
    <!-- QuickviewModal -->
    <div class="modal fade" id="quickViewModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-6">
                  <div id="quickViewCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
                    <ol class="carousel-indicators">
                      <li data-target="#quickViewCarousel" data-slide-to="0" class="active"></li>
                      <li data-target="#quickViewCarousel" data-slide-to="1"></li>
                      <li data-target="#quickViewCarousel" data-slide-to="2"></li>
                      <li data-target="#quickViewCarousel" data-slide-to="3"></li>
                      <li data-target="#quickViewCarousel" data-slide-to="4"></li>
                    </ol>
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img :src="quickViewProduct.imageUrl" class="d-block w-100">
                      </div>
                      <div class="carousel-item">
                        <img src="@/assets/img/productImg-1.jpg" class="d-block w-100">
                      </div>
                      <div class="carousel-item">
                        <img src="@/assets/img/productImg-2.jpg" class="d-block w-100">
                      </div>
                      <div class="carousel-item">
                        <img src="@/assets/img/productImg-3.jpg" class="d-block w-100">
                      </div>
                      <div class="carousel-item">
                        <img src="@/assets/img/productImg-4.jpg" class="d-block w-100">
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#quickViewCarousel" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#quickViewCarousel" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="info">
                    <h5>{{ quickViewProduct.title }}</h5>
                    <p class="item__price mt-3">
                      <span class="item__old-price" v-if=" getNowPage == 'Sale' ">{{ quickViewProduct.origin_price | currency }}</span>
                      <span>{{ quickViewProduct.price | currency }}</span>
                    </p>
                    <div class="mt-4 border-top">
                      <div class="p-size d-flex pt-4">
                        <div class="mr-auto text-darktheme">Size</div>
                        <ul class="item__size">
                          <li>
                            <a href="#" @click.prevent=" quickViewProduct.size = 'S' " :class="{'active': quickViewProduct.size == 'S'}">
                                <span>S</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" @click.prevent=" quickViewProduct.size = 'M' " :class="{'active': quickViewProduct.size == 'M'}">
                                <span>M</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" @click.prevent=" quickViewProduct.size = 'L' " :class="{'active': quickViewProduct.size == 'L'}">
                                <span>L</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="p-quantity d-flex pt-3">
                        <div class="mr-auto text-darktheme">Quantity</div>
                        <vs-input-number class="m-0" color="tan" min="1" max="20" v-model="quickViewProduct.qty"/>
                      </div>
                    </div>
                    <div class="mt-4 border-bottom">
                      <a class="pb-4 d-flex" data-toggle="collapse" href="#p-Detalis">
                        <div class="mr-auto">Details</div>
                        <span><i class="fas fa-plus"></i></span>
                      </a>
                      <div class="collapse" id="p-Detalis">
                        <div class="intro">
                          <p>{{ quickViewProduct.content }}</p>
                          <p>{{ quickViewProduct.description }}</p>
                        </div>
                      </div>
                    </div>
                    <button class="btn btn-outline-darktheme btn-block mt-3"
                    @click.prevent="goProductDetail( quickViewProduct.id, quickViewProduct.size, quickViewProduct.qty)">
                      All Product Details
                    </button>
                  </div>
                  <div class="addCart-btn p-3">
                    <button class="btn btn-block btn-dred" @click="addToCart(quickViewProduct.id, quickViewProduct.qty, quickViewProduct.size)">ADD TO BAG <i class="fas fa-cart-plus"></i></button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

import $ from 'jquery';
export default {
  data () {
    return {
      products:[],
      select:'',
      swiperOption2: {
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
      girlsTops:[  
          {name:'T-Shirts', id:"gT-Shirts"},
          {name:'Tank Tops', id:"gTank-Tops"},
          {name:'Sweaters', id:"gSweaters"},
      ],
      girlsBottoms:[  
          {name:'Jeans', id:"gJeans"},
          {name:'Dresses', id:"gDresses"},
      ],
      quickViewProduct:{},
    }
  },
  methods: {
    getProducts(page = 1){
        //console.log("Girls.vue Methods - getProducts - Start");
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
        const vm = this;
        vm.$store.dispatch('updateLoading' , true);
        this.$http.get(api).then((response) => {
            //console.log("  response.data:", response.data)
            vm.$store.dispatch('updateLoading' , false);
            vm.products = response.data.products.filter(item => item.category.indexOf('g') !== -1);
        })
        //console.log("Girls.vue Methods - getProducts - End");
    },

    getParams() {
      if (this.$route.query.category) {
        return this.$route.query.category;
      } else {
        return 'home';
      }
    },

    updateNowPage() {
      //console.log("Girls.vue Methods - updateNowPage - Start");
      var vm = this;
      //console.log('  Before dispatch', vm.$route.query.id);
      vm.$store.dispatch('updateNowPage' ,vm.$route.query.id);
      //console.log('  After dispatch', vm.$route.query.id);
      //console.log("Girls.vue Methods - updateNowPage - End");
    },

    // Update NowPage with vuex when click category
    onClickCategory(id) {
        const vm = this;
        var nowPage = vm.$store.state.nowPage;
        let idStr = '#' + nowPage;
        vm.$router.push({ path: '/girls', query: {id: id} }).catch(err => {});
        vm.updateNowPage();
    },

    openQuickViewModal(item){
      //console.log("Girls.vue Methods - openQuickViewModal - Start");
      this.quickViewProduct = Object.assign({}, item ,{ qty:1, size:"", });
      //console.log(  "quickViewProduct:", item,this.quickViewProduct);
      $('#quickViewModal').modal('show');
      $('#quickViewModal').on('show.bs.modal', function (e) {
        $('#quickViewCarousel').carousel(0);
      })
      //console.log("Girls.vue Methods - openQuickViewModal - End");
    },

    goProductDetail( productId, size, qty=1){
      const vm = this;
      if(size !== null){
        vm.$router.push({ path: `/detail/${productId}`, query: { size:size, qty:qty} }).catch(err => {});
      }else{
        vm.$router.push({ path: `/detail/${productId}`, query: { qty:qty} }).catch(err => {});
      }
      $('#quickViewModal').modal('hide'); 
    },

    addToCart(id, qty, size) {
      var result = false;
      if(size == ""){
        this.$store.dispatch('alertMessageModules/updateMessage', { message: '請選擇尺寸', status: 'danger' });
      }else{
        //console.log("addToCart");
        this.$store.dispatch('cartModules/addToCart', { id, qty, size, result });
        $('#quickViewModal').modal('hide'); 
      }
      
    },

    updateSubCategory() {
      var vm  = this;
      var Category = vm.$route.query.id;
      if (typeof(Category) == 'string'){
        if (Category.indexOf('New') != -1) {
          return 'New arrives' // Girls, Boys, Accessories

        } else if (Category.indexOf('T-Shirts') != -1) {
          return 'T-Shirts' // Girls, Boys

        } else if (Category.indexOf('Tank') != -1) {
          return 'Tank Tops' // Girls

        } else if (Category.indexOf('Sweaters') != -1) {
          return 'Sweaters' // Girls, Boys

        } else if (Category.indexOf('Jeans') != -1) {
          return 'Jeans' // Girls, Boys

        } else if (Category.indexOf('Dresses') != -1) {
          return 'Dresses' // Girls

        } else if (Category.indexOf('Shorts') != -1) {
         return 'Shorts' // Boys

        } else if (Category.indexOf('Sale') != -1) {
         return 'Sale' // Boys

        } else return 'Unknown' // Unknown category
      } else return 'Unknown' // Unknown category
    },

  }, // methods End

  computed: {

    // filter Products with Vuex NowPage
    filterProducts(){
      //console.log("Girls.vue Compute - filterProducts - Start");
      const vm = this;
      var nowPage = vm.$store.state.nowPage;
      this.getParams();
      //console.log("Girls.vue Compute - filterProducts - End");
      return vm.products.filter(item => item.category.indexOf(nowPage) !== -1);
    },

    // Get NowPage with Vuex
    getNowPage(){
        var vm = this;
        return vm.$store.state.nowPage;
    },

    getSubCategory() {
      const vm = this;
      return vm.updateSubCategory();
    }

  }, // compute End

  created() {
    this.getParams();
    this.getProducts();
    this.updateNowPage(); // update now page
  },
}


</script>

<style lang="scss" >
    @import  '@/assets/_products.scss';
</style>
