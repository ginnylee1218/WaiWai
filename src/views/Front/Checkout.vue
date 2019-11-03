<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#" @click.prevent="onClickHome">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Bag</li>
      </ol>
    </nav>
    <div class="container my-5">
      <!--stepList-->
      <ul class="d-flex justify-content-center step-panel mb-5">
        <li class="step-panel__step1" :class="{'active':step == 1}">
          <span class="step-panel__num">1</span>
          <span class="step-panel__item">確認購物清單</span>
        </li>
        <li class="step-panel__step2" :class="{'active':step == 2}">
          <span class="step-panel__num">2</span>
          <span class="step-panel__item">填寫訂購資料</span>
        </li>
        <li class="step-panel__step3" :class="{'active':step == 3}">
          <span class="step-panel__num">3</span>
          <span v-if=" order.is_paid == false" class="step-panel__item">金流付款</span>
          <span v-else class="step-panel__item">完成訂購</span>
        </li>
      </ul>
      <!--step1-->
      <div v-if="step == 1" class="row justify-content-center">
        <div class="col-md-10">
          <div class="table-responsive nowrap">
            <table class="table bag-table table-hover">
              <thead>
                <tr>
                  <th width="400">商品資訊</th>
                  <th width="100" class="text-center cell-right">數量</th>
                  <th width="100" class="text-center d-none d-sm-table-cell">價格</th>
                  <th width="100" class="text-center">小計</th>
                  <th width="100" class="text-center">刪除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in carts.carts" :key="item.id">
                  <td>
                    <div class="d-flex">
                      <img :src="item.product.imageUrl" class="img-fluid">
                      <div class="info ml-2 ml-sm-3">
                        <p class="mb-1">{{ item.product.title }}</p>
                        <p>尺寸：{{ item.size }}</p>
                        <p v-if="item.coupon" class="text-tan mt-1" style="font-size:8px"><i class="fas fa-check"></i>  {{item.coupon.title}}</p>
                      </div> 

                    </div>
                  </td>
                  <td class="text-center">
                  <p>{{ item.qty }}</p>
                  </td>
                  <td class="text-right d-none d-sm-table-cell">
                    <div v-if="!item.coupon">
                      {{ item.total | currency }}
                    </div>
                    <div v-else>
                      <del class="text-muted">{{ item.total | currency }}</del>
                      <div class="text-darktheme mt-2">
                        {{ item.final_total | currency }}
                      </div>
                    </div>
                  </td>
                  <td class="text-right" :class="{'text-darktheme': item.coupon}">{{item.final_total | currency}}</td>
                  <td class="text-center"><a href="#" @click.prevent="delCarts(item.id)"><i class="far fa-trash-alt"></i></a></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-sm-between flex-column flex-sm-row align-items-center align-items-sm-start cart-bill border-top pt-5 px-sm-3">
            <div class="w-md-50 cart-coupon">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="優惠券代碼" v-model="couponCode">
                <div class="input-group-append-set">
                  <button class="btn btn-darktheme px-4" type="button" @click="addCouponCode()">確認</button>
                </div>
              </div>
              <p v-if="carts.total !== carts.final_total" class="mt-3 text-tan" style="font-size:8px"><i class="fas fa-check-double"></i>  已套用優惠券</p>
            </div>
            <ul class="cart-bill-detail mt-3 mt-sm-0">
              <li class="d-flex justify-content-between pt-0">
                <span>總金額</span>
                <span>{{ carts.total | currency}}</span>
              </li>
              <li v-if="carts.total !== carts.final_total" class="d-flex justify-content-between">
                <span>折價券</span>
                <span class="text-tan"> - {{ carts.total - carts.final_total | currency}}</span>
              </li>
              <li class="d-flex justify-content-between">
                <span>運費</span>
                <span v-if="carts.final_total < 500">$120</span>
                <span class="text-tan" v-else>Free</span>
              </li>
              <li v-if="carts.final_total > 500" class="text-tan text-right pt-0" style="font-size:8px"><i class="fas fa-check-double"></i> 滿 $500 免運費</li>
              <li class="d-flex justify-content-between pt-3 mt-3 border-top">
                <span>應付金額</span>
                <span :class="{'text-darktheme': carts.total !== carts.final_total}">{{finalMoney | currency}}</span>
              </li>
            </ul>
          </div>
          <div class="d-flex justify-content-end stepBtn mt-3">
            <button class="btn btn-outline-darktheme mt-5" @click="step = 2">下一步<i class="fas fa-hand-point-right pl-2"></i></button>
          </div>
        </div>
        
      </div>

      <!--step2-->
      <div v-if="step == 2">
        <div class="row justify-content-center mt-4">
          <div class="col-11 col-sm-10 col-lg-8">
            <h5 class="text-content text-center mb-3 bg-light py-3">訂購人資訊</h5>
            <form @submit.prevent="createOrder">
              <div class="form-row">
                <div class="form-group col-sm-6">
                  <label for="inputName">收件人姓名</label>
                  <input type="text" class="form-control" name="name" id="inputName" placeholder="姓名" required
                  :class="{'is-invalid': errors.has('name')}" v-validate="'required'"
                  v-model="formData.user.name">
                  <span class="text-danger" v-if="errors.has('name')">姓名欄位不得留空</span>
                </div>
                <div class="form-group col-sm-6">
                  <label for="inputTel">收件人手機</label>
                  <input type="tel" class="form-control" name="tel" id="inputTel" placeholder="手機號碼" required
                  :class="{'is-invalid': errors.has('tel')}" v-validate="'required'"
                  v-model="formData.user.tel">
                  <span class="text-danger" v-if="errors.has('tel')">電話欄位不得留空</span>
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" name="email" id="email" placeholder="Email" required
                :class="{'is-invalid': errors.first('email')}" v-validate="'required|email'"
                v-model="formData.user.email">
                <span class="text-danger" v-if="errors.first('email')">
                  {{ errors.first('email') }}
                </span>
              </div>
              <div class="form-group">
                <label for="address">收件人地址</label>
                <input type="text" class="form-control" name="address" id="address" placeholder="地址" required
                :class="{'is-invalid': errors.first('address')}" v-validate="'required'"
                v-model="formData.user.address">
                <span class="text-danger" v-if="errors.first('address')">地址欄位不得留空</span>
              </div>
              <div class="form-group">
                <label for="message">留言</label>
                <textarea name="message" id="message" class="form-control"
                cols="10" rows="3" v-model="formData.user.message"></textarea>
              </div>
              <div class="d-flex justify-content-between mt-3">
                <button type="button" class="btn btn-outline-secondary" @click="step = 1"><i class="fas fa-hand-point-left pr-2"></i>上一步</button>
                <button type="submit" class="btn btn-outline-darktheme">建立訂單<i class="fas fa-hand-point-right pl-2"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!--step3-->
      <div v-if="step == 3">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="table-responsive nowrap">
              <table class="table bag-table table-hover">
                <thead>
                  <tr>
                    <th width="400">商品資訊</th>
                    <th width="100" class="text-center cell-right">數量</th>
                    <th width="100" class="text-center d-none d-sm-table-cell">價格</th>
                    <th width="100" class="text-center">小計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.products" :key="item.id">
                    <td>
                      <div class="d-flex">
                        <img :src="item.product.imageUrl" class="img-fluid">
                        <div class="info ml-2 ml-sm-3">
                          <p class="mb-1">{{ item.product.title }}</p>
                          <p>尺寸：{{ item.size }}</p>
                          <p v-if="item.coupon" class="text-tan mt-1" style="font-size:8px"><i class="fas fa-check"></i>  {{item.coupon.title}}</p>
                        </div> 

                      </div>
                    </td>
                    <td class="text-center">
                    <p>{{ item.qty }}</p>
                    </td>
                    <td class="text-right d-none d-sm-table-cell">
                      <div v-if="!item.coupon">
                        {{ item.total | currency }}
                      </div>
                      <div v-else>
                        <del class="text-muted">{{ item.total | currency }}</del>
                        <div class="text-darktheme mt-2">
                          {{ item.final_total | currency }}
                        </div>
                      </div>
                    </td>
                    <td class="text-right" :class="{'text-darktheme': item.coupon}">{{item.final_total | currency}}</td>
                  </tr>
                  <tr class="border-top text-darktheme">
                    <td class="text-right d-none d-sm-table-cell"></td>
                    <td colspan="2" class="text-right">應付金額<span v-if="order.total < 500">(含運費)</span></td>
                    <td class="text-right">{{ orderFinalMoney | currency }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row justify-content-center mt-4">
          <div class="col-md-10 col-lg-6">
            <table class="table table-borderless order-table mb-3">
              <tr>
                <th width="200">收件人姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th >收件人Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr v-if="order.user.message">
                <th>留言</th>
                <td>{{ order.user.message }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td v-if="!order.is_paid">尚未付款</td>
                <td class="text-darksalmon" v-else>付款成功<i class="fas fa-check-circle pl-2"></i></td>
              </tr>
            </table>
            <div class="text-center mt-4" >
              <button v-if="!order.is_paid" class="btn btn-outline-darktheme" @click="payOrder">確認付款<i class="fas fa-credit-card pl-2"></i></button>
              <button v-else class="btn btn-outline-darktheme" @click="onClickHome">Home<i class="fas fa-home pl-2"></i></button>
            </div>
          </div> 
        </div>

        
      </div>

    </div>

      
  </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
      couponCode: '',
      step:1,
      formData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      orderId:'',
      order: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: '',
        },
      },
      isPay:false,
    }
  },
  methods: {
    delCarts(id){
      this.$store.dispatch('cartModules/delCarts', id);
      setTimeout(() => {
          if(this.cartsLen <= 1){
          this.$router.push( {path : '/' })
          this.$store.dispatch('alertMessageModules/updateMessage', { message: '購物車已清空，請繼續購物', status: 'warning' });
        }
      }, 1000);
    },
    addCouponCode(){
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        "code": vm.couponCode,
      }
      if(vm.couponCode == ""){
        vm.$store.dispatch('alertMessageModules/updateMessage', { message: '請輸入優惠券代碼', status: 'danger' });
      }else{
        this.$http.post(api, { data: coupon }).then((response) => {
          if(response.data.success){
            vm.getCart();
          }else{
            vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
          }
        })
      }
    },
    createOrder(){
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const orderSend = vm.formData;
      vm.$validator.validate().then((valid) => {
        if (valid) {
          this.$http.post(api , { data : orderSend }).then((response) => {
            //console.log('訂單建立', response.data)
            if(response.data.success){
              vm.orderId = response.data.orderId;
              vm.getOrder();
              vm.step = 3;
            }else{
              vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
            }  
          })
        }else{
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: '欄位不完整', status: 'danger' });
        }
      });
    },
    getOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.$store.dispatch('updateLoading' , true);
      this.$http.get(url).then((response) => {
        vm.order = response.data.order;
        vm.$store.dispatch('cartModules/getCart');
        vm.$store.dispatch('updateLoading' , false);
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.$store.dispatch('updateLoading' , true);
      this.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'success' });
          vm.$store.dispatch('updateLoading' , false);
          vm.getOrder();
        } else {
          vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
        }
      });
    },
    onClickHome() {
      const vm = this;
      vm.$router.push({ path: '/'}).catch(err => {});
      vm.$store.dispatch('updateNowPage' ,'home');
    },
    ...mapActions('cartModules', ['getCart']),

  },
  
  computed: {
    finalMoney(){
      if(this.carts.final_total < 500){
        return Number(this.carts.final_total) + 120;  
      }else{
        return this.carts.final_total;
      }
    },
    orderFinalMoney(){
      if(this.order.total){
        if(this.order.total < 500){
          return Number(this.order.total) + 120;  
        }else{
          return this.order.total;
        }
      }
      
    },
    ...mapGetters('cartModules', ['carts', 'cartsLen']),
  },
  

  created() {
    this.$store.dispatch('cartModules/getCart');
    this.$store.dispatch('updateNowPage' ,'checkout');
  },

}
</script>

<style lang="scss" >
    @import  '@/assets/_products.scss';
    .nowrap{
      white-space: nowrap;
    }
    .breadcrumb{
      background-color: #af715b24;
    }
    .step-panel li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33.33%;
      height: 52px;
      font-size: 14px;
      background-color: #af715b24;
      color: #af715b;
      position: relative; 
      @media (max-width: 576px){
        display: none;
      }
      &.active{
        background-color: #af715b;
        color: white;
        @media (max-width: 576px){
          display: flex;
          width: 200px;
        }
      }
      .step-panel__num {
        font-size: 22px;
        margin: 0 24px 0 -24px;
      }
      .step-panel__item {
        line-height: 52px;
        letter-spacing: .08em;
      }
    }
    .step-panel__step1, .step-panel__step2{
      box-shadow: -20px 0 #fff inset;
      &.active::before{
          border-color: #fff transparent #fff #af715b;
          @media (max-width: 576px){
            content: none
          }
        }
      &::before{
        content: '';
        display: block;
        position: absolute;
        height: 0;
        width: 0;
        right: 5px;
        top: 0;
        background-color: #fff;
        border-width: 26px 0 26px 30px;
        border-style: solid;
        border-color: #fff transparent #fff #af715b24;
      }
    }
    .bag-table{
      th,td{
        vertical-align: middle;
      }
      td{
        border: none;
      }
      img{
        width: 60px;
        height: 60px;
        object-fit: cover;
         @media (max-width: 576px){
           width: 30px;
           height: 40px;
        }
      }
      p{
        margin: 0;
        font-size: 12px;
      }
      del{
        text-decoration: line-through;
      }
    }
    .cart-bill{
      .form-control:focus {
        border-color: tan;
        box-shadow: 0 0 0 0.05rem rgba(138, 9, 13, 0.25);
      }
      .input-group-append-set{
        margin-left: -3px;
      }
      .cart-bill-detail{
        min-width: 40%;
        border: 5px solid #af715b24;
        padding: 20px 30px;
  
        @media (max-width: 576px){
          min-width: 80%;
        }
        li{
          padding-top: 5px;
        }
      }
    }
    form{
      .form-control:focus {
        border-color: #af715b;
        box-shadow: 0 0 0 0.1rem rgba(138, 9, 13, 0.25);
      }
    }
    .order-table{
      th{
        color: #af715b;
      }
      border: 5px solid #af715b24;
    }
</style>