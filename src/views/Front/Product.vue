<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" v-if="product.category">
        <li class="breadcrumb-item"><a href="#" @click.prevent="onClickHome">Home</a></li>
        <li class="breadcrumb-item">
          <a href="#" class="text-capitalize" 
          @click.prevent="onClickSubCategory(mainCategory)">
          {{mainCategory}} - {{subCategory}}
          </a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
      </ol>
    </nav>
    <div class="container my-5 px-md-5">
      <div class="row">
        <div class="col-sm-7">
          <lingallery  :height="500" :width="500" :accentColor="'#af715b'" :items="[
              {src: product.imageUrl , thumbnail: product.imageUrl},
              {src: productImgs.productImg1, thumbnail: productImgs.productImg1},
              {src: productImgs.productImg2, thumbnail: productImgs.productImg2},
              {src: productImgs.productImg3, thumbnail: productImgs.productImg3},
              {src: productImgs.productImg4, thumbnail: productImgs.productImg4},
          ]"/>
        </div>

        <div class="col-sm-5 mt-5 mt-sm-0">
          <div class="info p-4 p-sm-0">
            <h5>{{ product.title }}</h5>
            <p class="item__price mt-3">
              <span class="item__old-price" v-if=" $route.query.categoryName == 'Sale' ">{{ product.origin_price | currency }}</span>
              <span v-if="product.price">{{ product.price | currency }}</span>
            </p>
            <div class="my-4 py-4 border-top border-bottom">
              <div class="p-size d-flex">
                <div class="mr-auto text-darktheme">Size</div>
                <ul class="item__size">
                  <li>
                    <a href="#" @click.prevent="size = 'S' " :class="{'active':size == 'S'}">
                        <span>S</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" @click.prevent="size = 'M' " :class="{'active':size == 'M'}">
                        <span>M</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" @click.prevent="size = 'L' " :class="{'active':size == 'L'}">
                        <span>L</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="p-quantity d-flex pt-3">
                <div class="mr-auto text-darktheme">Quantity</div>
                <vs-input-number class="m-0" color="tan" min="1" max="20" v-model="qty"/>
              </div>
              <div class="pt-3">
                <div class="text-darktheme">Details</div>
                  <div class="intro text-tan mt-3">
                    <p>{{ product.content }}</p>
                    <p>{{ product.description }}</p>
                  </div>
              </div>
              <div class="mt-4">
                <a href="#sizeChartModal" class="text-darktheme pointer" data-toggle="modal"><i class="fas fa-ruler-horizontal"></i>  Size Chart</a>
              </div>
            </div>
          </div>
          <div class="addCart-btn p-3">
            <button class="btn btn-block btn-dred" @click="addToCart(product.id, qty, size)">ADD TO BAG <i class="fas fa-cart-plus"></i></button>
          </div>
        </div>
      </div>
      
    </div>

  <!-- sizeChartModal -->
    <div class="modal fade" id="sizeChartModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-darktheme">
            <h5 class="modal-title text-white" id="sizeChartModalTitle">Size Chart<i class="fas fa-ruler-horizontal pl-2"></i></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body  p-md-5">
            <div class="table-responsive">
              <table class="table table-hover">
                <tbody>
                  <tr>
                    <td width="100">尺寸</td>
                    <td width="80">S</td>
                    <td width="80">M</td>
                    <td width="80">L</td></tr>
                  <tr>
                    <td>肩寬</td>
                    <td>51</td>
                    <td>53.5</td>
                    <td>56</td></tr>
                  <tr>
                    <td>胸寬</td>
                    <td>55</td>
                    <td>57.5</td>
                    <td>60</td></tr>
                  <tr>
                    <td>下擺寬</td>
                    <td>58</td>
                    <td>60.5</td>
                    <td>63</td></tr>
                  <tr>
                    <td>臂圍</td>
                    <td>22.5</td>
                    <td>23.5</td>
                    <td>24.5</td></tr>
                  <tr>
                    <td>袖長</td>
                    <td>52</td>
                    <td>53</td>
                    <td>54</td></tr>
                  <tr>
                    <td>袖口寬</td>
                    <td>14</td>
                    <td>15</td>
                    <td>16</td></tr>
                  <tr>
                    <td>衣長(前/後)</td>
                    <td>57/58.5</td>
                    <td>58.5/60</td>
                    <td>60/61.5</td></tr>
                  <tr>
                    <td>重量(g)</td>
                    <td>533</td>
                    <td>533</td>
                    <td>533</td>
                  </tr>
                  <tr>
                  <td class="etc" colspan="4">單位: CM<br>※ 本尺寸表會因布料彈性、水洗處理、測量起訖點、人為拉扯等因素，與實際商品尺寸略有誤差，誤差尺寸±2cm，在國際驗貨標準範圍都是屬於可接受範圍，並不屬於瑕疵。</td>
                  </tr>
                </tbody>
              </table>
            </div>

            
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
import productImg1 from '@/assets/img/productImg-1.jpg';
import productImg2 from '@/assets/img/productImg-2.jpg'
import productImg3 from '@/assets/img/productImg-3.jpg'
import productImg4 from '@/assets/img/productImg-4.jpg'

export default {
  data () {
    return {
      productId:"",
      product: [],
      size:'',
      qty:1,
      productImgs: {
        productImg1: productImg1,
        productImg2: productImg2,
        productImg3: productImg3,
        productImg4: productImg4,
      },
    }
  }, // data

  methods: {
    getProduct() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.product = response.data.product;
        } else {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
        }
      });
    },

    getParams() {
      if (this.$route.params.productId) {
        this.productId = this.$route.params.productId;
        this.qty = this.$route.query.qty;
        if (this.$route.query.size){
          this.size = this.$route.query.size;
        }
      } 
    },

    addToCart(id, qty, size) {
      if(size == ""){
        this.$store.dispatch('alertMessageModules/updateMessage', { message: '請選擇尺寸', status: 'danger' });
      }else{
        this.$store.dispatch('cartModules/addToCart', { id, qty, size });
      }
      
    },

    // go to SubCategory from product web
    onClickSubCategory(mainCategory) {
      //console.log("Product.vue Methods - onClickSubCategory - Start");
      var vm  = this;
      var Category = vm.product.category;
      var genderStr = '/' + mainCategory;
      //console.log("  mainCategory:", mainCategory, "Category:", Category);
      vm.$router.push({ path: genderStr, query: {id: Category} }).catch(err => {});
      //console.log("Product.vue Methods - onClickSubCategory - End");
    },

    updateNowPageProduct() {
      this.$store.dispatch('updateNowPage' ,this.product.category);
    },

    onClickHome() {
      const vm = this;
      vm.$router.push({ path: '/'}).catch(err => {});
      vm.$store.dispatch('updateNowPage' ,'home');
    },

  }, // methods

  computed: {
    mainCategory(){
      //console.log("Product.vue Methods - mainCategory - Start");
      var vm  = this;
      var NowPage;
      if (typeof(vm.product.category) == 'string') {
        switch(vm.product.category[0]){
          case 'g':
            NowPage = 'girls'
            break;
          case 'b':
            NowPage = 'boys'
            break;
          case 'a':
            NowPage = 'accessories'
            break;
        }
      vm.updateNowPageProduct();
      }
      //console.log("Product.vue Methods - mainCategory - End");
      return NowPage;
    },

    subCategory() {
      var vm  = this;
      var Category = vm.product.category;
      if (typeof(Category) == 'string'){
        if (Category.indexOf('New') != -1) {
          return 'New arrives' // Girls, Boys, Accessories

        } else if (Category.indexOf('T-Shirts') != -1) {
          return 'T Shirts' // Girls, Boys

        } else if (Category.indexOf('Tank') != -1) {
          return 'Tank' // Girls

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
      }
    },
  }, // Computed

  watch: {
     '$route.params.productId':{
        handler: function() {
          if(this.productId != ''){
            this.$store.dispatch('updateLoading' , true); 
            this.getParams();
            this.getProduct();
            setTimeout(() => {
              this.$store.dispatch('updateLoading' , false);
            }, 1000);
          }
        },
        deep: true,
        immediate: true
      }
  },
  created() {
    this.getParams();
    this.getProduct();
    this.updateNowPageProduct();
  }, // created

} // export default
</script>

<style lang="scss" >
    @import  '@/assets/_products.scss';
    .breadcrumb{
      background-color: #af715b24;
    }
    .lingallery figure{
      height: 500px;
      @media (max-width: 576px){
        height: 400px !important;   
      }
      img{
        min-height: 500px;
        max-height: 500px !important;
        object-fit: cover;
        @media (max-width: 576px){
          min-height: 400px;  
          max-height: 400px !important; 
        }
      }
    }
    .lingallery_thumbnails_content{
      text-align: center;
      margin-top: 20px !important;
    }
</style>