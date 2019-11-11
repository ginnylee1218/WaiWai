<template>
 <div>
    <loading :active.sync="isLoading" ></loading>
    <Alert></Alert>
    <div class="container-fluid p-0">
        <div class="header position-relative">
            <nav class="navbar navbar-expand-md navbar-light fixed-top bg-white py-0 navbar-fixed-right">
                <a class="navbar-brand logo" @click.prevent="onClickHome">Wai Wai</a>
                <div class="d-flex flex-row order-2 order-md-3">
                    <ul class="navbar-nav sub-nav flex-row mr-1">
                        <li class="nav-item dropdownli">
                            <a class="nav-link cartIcon " href="#" @click.prevent="cartShow = !cartShow; navShow = false" 
                            ref="cartButton">
                                <i class="fas fa-shopping-bag i-scale"></i>
                                <span>{{cartsLen}}</span>
                            </a>
                            <div class="cartmenu border-darktheme" v-if="cartShow" 
                            v-closable="{
                                exclude: ['cartButton'],
                                handler: 'onClickOutsideCart'
                            }">
                                <a href="#" @click.prevent="cartShow = false" class="text-dred pl-2"><i class="fas fa-times"></i></a>
                                <p v-if="cartsLen == 0" class="m-4">購物車是空的</p>
                                <table v-else class="table cart-table-list table-responsive text-secondary">
                                    <thead>
                                        <tr>
                                            <th class="text-center">品名</th>
                                            <th width="50" class="text-center">尺寸</th>
                                            <th width="50" class="text-center">數量</th>
                                            <th width="30" class="text-center"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in carts.carts" :key="item.id">
                                            <td>
                                                <a href="#" @click.prevent="goProductDetail(item.product_id)">
                                                    <img :src="item.product.imageUrl" class="img-fluid">
                                                    <p class="ml-3">{{ item.product.title }}</p>
                                                </a>
                                            </td>
                                            <td class="text-center">{{ item.size }}</td>
                                            <td class="text-center">{{ item.qty }}</td>
                                            <td>
                                                <a href="#" class="close" @click.prevent.stop="delCarts(item.id)">
                                                    <i class="fas fa-times fa-xs"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="dropdown-divider"></div>
                                <div v-if="cartsLen > 0" class="text-right mt-3">
                                    <router-link @click.native="cartShow = false" to="/checkout" class="btn btn-small btn-darktheme btn-block" >Checkout  <i class="fas fa-shopping-cart"></i></router-link>
                                </div>
                                
                            </div>
                        </li>
                    </ul>
                    <button class="navbar-toggler " type="button" data-toggle="collapse" @click="navShow = ! navShow">
                        <span><i class="fas" :class="[navShow? 'fa-times':'fa-bars']"></i></span>
                    </button>
                </div>
                

                <div class="navbar-collapse order-3 order-md-2 side-collapse-right" :class="{'notShow': !navShow}" id="navbarSupportedContent">
                    <ul class="navbar-nav navbar-right w-100 d-none d-md-flex">
                        <li class="nav-item mr-2">
                            <a class="nav-link" @click.prevent="onClickHome()"
                            :class="{'active': getNowPageDesktop == 'home'}" >HOME</a>
                        </li>
                        <li class="nav-item mr-2">
                            <a class="nav-link" @click.prevent="onClickCategory('gNew', 'girls')"
                            :class="{'active': getNowPageDesktop == 'girls'}">GIRLS </a>
                        </li>
                        <li class="nav-item mr-2">
                            <a class="nav-link" @click.prevent="onClickCategory('bNew', 'boys')"
                            :class="{'active': getNowPageDesktop == 'boys'}">BOYS
                            </a>
                        </li>
                        <li class="nav-item mr-2">
                            <a class="nav-link" @click.prevent="onClickCategory('aNew', 'accessories')"
                            :class="{'active': getNowPageDesktop == 'accessories'}">ACCESSORIES
                            </a>
                        </li>
                    </ul>
                    
                    <ul class="navbar-nav navbar-right w-100 d-block d-md-none pl-2 pl-sm-4 nav-mobile">
                        <li class="nav-item" @click.prevent="onClickHome()">
                            <router-link id="home" class="nav-link " to="/" 
                            :class="{'active': getNowPage == 'home'}">HOME</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="collapse" href="#girlsMenu">
                                GIRLS  <i class="fas fa-angle-down"></i>
                            </a>
                            <ul class="category-mobile ml-3 collapse" id="girlsMenu">
                                <li>
                                    <a href="#" id="gNew" @click.prevent="onClickCategory('gNew', 'girls')" 
                                    :class="{'active': getNowPage == 'gNew'}">
                                    <i class="fas fa-gift"></i>
                                    New Arrivals
                                    </a>
                                </li>
                                <li>
                                    <a href="#girlsTopMenu" data-toggle="collapse"><i class="fas fa-tshirt"></i> Tops  <i class="fas fa-angle-down"></i></a>
                                    <ul class="category-level-2 ml-4 collapse" id="girlsTopMenu">
                                        <li class="list-item" v-for="(item,index) in girlsTops" :key="item.index">
                                            <a :id="item.id" href="#" @click.prevent="onClickCategory((item.id), 'girls')" 
                                            :class="{'active': getNowPage == (item.id)}">
                                            {{item.name}}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#girlsBTMenu" data-toggle="collapse"><i class="fas fa-socks"></i> Bottoms  <i class="fas fa-angle-down"></i></a>
                                    <ul class="category-level-2 ml-4 collapse" id="girlsBTMenu">
                                        <li class="list-item" v-for="(item,index) in girlsBottoms" :key="item.index">
                                            <a :id="item.id" href="#" @click.prevent="onClickCategory((item.id), 'girls')"
                                            :class="{'active': getNowPage == (item.id)}">{{item.name}}</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" id="gSale" @click.prevent="onClickCategory('gSale', 'girls')"
                                    :class="{'active': getNowPage == 'gSale'}"><i class="fas fa-smile-wink"></i> Sale
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="collapse" href="#boysMenu">
                                BOYS  <i class="fas fa-angle-down"></i>
                            </a>
                            <ul class="category-mobile ml-3 collapse" id="boysMenu">
                                <li>
                                    <a href="#" id="bNew" @click.prevent="onClickCategory('bNew', 'boys')"  
                                    :class="{'active': getNowPage == 'bNew'}">
                                    <i class="fas fa-gift"></i> 
                                    New Arrivals
                                    </a>
                                </li>
                                <li>
                                    <a href="#boysTopMenu" data-toggle="collapse"><i class="fas fa-tshirt"></i> Tops  <i class="fas fa-angle-down"></i></a>
                                    <ul class="category-level-2 ml-4 collapse" id="boysTopMenu">
                                        <li class="list-item" v-for="(item,index) in boysTops" :key="item.index">
                                            <a :id="item.id" href="#" @click.prevent="onClickCategory((item.id), 'boys')"
                                            :class="{'active': getNowPage == (item.id)}">{{item.name}}</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#boysBTMenu" data-toggle="collapse"><i class="fas fa-socks"></i> Bottoms  <i class="fas fa-angle-down"></i></a>
                                    <ul class="category-level-2 ml-4 collapse" id="boysBTMenu">
                                        <li class="list-item" v-for="(item,index) in boysBottoms" :key="item.index">
                                            <a :id="item.id" href="#" @click.prevent="onClickCategory((item.id), 'boys')"
                                            :class="{'active': getNowPage == (item.id)}">{{item.name}}</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" id="bSale" @click.prevent="onClickCategory('bSale', 'boys')"
                                    :class="{'active': getNowPage == 'bSale'}"><i class="fas fa-smile-wink"></i> Sale</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="collapse" href="#accessoriesMenu">
                                ACCESSORIES  <i class="fas fa-angle-down"></i>
                            </a>
                            <ul class="category-mobile ml-3 collapse" id="accessoriesMenu">
                                <li>
                                    <a href="#" id="aNew" @click.prevent="onClickCategory('aNew', 'accessories')"
                                    :class="{'active': getNowPage == 'aNew'}"><i class="fas fa-gift"></i> New Arrivals
                                    </a>
                                </li>
                                <li>
                                    <a href="#" id="aSale" @click.prevent="onClickCategory('aSale', 'accessories')"
                                    :class="{'active': getNowPage == 'aSale'}"><i class="fas fa-gift"></i> Sale
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
        
        
            </nav>
        </div> 
        

        <div class="wrap side-collapse-container-right">
            <router-view></router-view>
        </div>
        
        <div class="footer">
            <div class="container">
                <div class="row">
                    <div class="footer__about pl-3 col-12 col-md-4">
                        <h4>About</h4>
                        <p>
                        WaiWai is the best kids clothes online shop in this world.<br/>
                        We guaranteed to provide the most comfortable clothes to your kids, this is not only the slogan of our brand but also our responsibility.<br/>
                        </p>
                    </div>
                    <div class="footer__contact pl-3 my-3 my-md-0 col-12 col-md-4">
                    
                        <h4>Service</h4>
                        <div class="footer__contact__content">客服信箱 waiwai@mail.com</div>
                        <div class="footer__contact__content">客服電話 02-1234-5678</div>
                        <div class="footer__contact__content">週一至週五 9:00-18:00</div>
                    </div>
                    <div class="social-media pl-3  col-12 col-md-4">
                        <ul class="d-flex">
                            <li><a href="#" class="ml-md-0"><i class="icon-facebook"></i></a></li>
                            <li><a href="#"><i class="icon-instagram"></i></a></li>
                            <li><a href="#"><i class="icon-twitter"></i></a></li>
                            <li><a href="#"><i class="icon-gplus"></i></a></li>
                        </ul>  
                    </div>
                    
                    <div class="footer__copyright col-12 mt-4 text-center">
                        <span>COPYRIGHT@2019&nbsp; BY GINNY </span><br>
                        <span>(資料來源來自網路，僅個人練習用，非商業/營利網站)</span>
                        <a class="pl-3" @click.prevent="openLoginModal">
                            <i class="fas fa-users-cog fa-sm"></i>
                        </a> 
                    </div>
                </div>
                
                
            </div>   
        </div>

    </div>

        <!--LoginModal-->
        <div id="loginModal" class="modal fade">
            <div class="modal-dialog modal-login">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="avatar">
                            <img src="@/assets/img/avatar.png" alt="Avatar">
                        </div>				
                        <h4 class="modal-title">後台管理員登入</h4>	
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="signin">
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="user.username" name="username" placeholder="Username" required="required">		
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" v-model="user.password" name="password" placeholder="Password" required="required">	
                            </div>        
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-lg btn-block login-btn">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>  


 </div>
</template>



<script>
import $ from 'jquery';
import Alert from '@/components/AlertMessage';
import { mapGetters, mapActions } from 'vuex';

export default {
    data () {
        return {
            user:{
                username:'',
                password:'',
            },
            cartShow:false,
            navShow:false,
            girlsTops:[  
                {name:'T-Shirts', id:"gT-Shirts"},
                {name:'Tank Tops', id:"gTank-Tops"},
                {name:'Sweaters', id:"gSweaters"},
            ],
            girlsBottoms:[  
                {name:'Jeans', id:"gJeans"},
                {name:'Dresses', id:"gDresses"},
            ],
            boysTops:[  
                {name:'T-Shirts', id:"bT-Shirts"},
                {name:'Sweaters', id:"bSweaters"},
            ],
            boysBottoms:[  
                {name:'Jeans', id:"bJeans"},
                {name:'Shorts', id:"bShorts"},
            ],
                          
        }
    },

    components: {
        Alert,
    },

    methods: {
        openLoginModal(){
            $('#loginModal').modal('show');
        },
        signin(){
            const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
            this.$http.post(api, vm.user).then((response) => {
                if(response.data.success){
                    $('#loginModal').modal('hide');
                    vm.$router.push("/admin/products")
                }else{
                    vm.$store.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' });
                }
            })
        },

        delCarts(id){
            this.$store.dispatch('cartModules/delCarts', id);
        },

        onClickCategory(destId, Gender) {
            const vm = this;
            if (destId == 'home') {
                vm.$router.push({ path: '/', query: { id: destId }}).catch(err => {});
                vm.$store.dispatch('updateNowPage' ,'home');
            } else {
                let genderStr = '/' + Gender;
                vm.$router.push({ path: genderStr, query: { id: destId }}).catch(err => {});
                vm.navShow = false;
                vm.$store.dispatch('updateNowPage' ,destId);
            }
        },

        onClickHome() {
            const vm = this;
            vm.$router.push({ path: '/'}).catch(err => {});
            vm.navShow = false;
            vm.$store.dispatch('updateNowPage' ,'home');
        },

        onClickOutsideCart () {
            this.cartShow = false;
        },

        goProductDetail( productId, size, qty=1){
            const vm = this;
            if(size !== null){
                vm.$router.push({ path: `/detail/${productId}`, query: { size:size, qty:qty} }).catch(err => {});
            }else{
                vm.$router.push({ path: `/detail/${productId}`, query: { qty:qty} }).catch(err => {});
            }
            //console.log('layout carts go detail')
            vm.cartShow = false;
        },

        ...mapActions('cartModules', ['getCart']),

    },
    computed: {
        isLoading(){
            return this.$store.state.isLoading;
        },

        getNowPageDesktop(){
            //console.log("Layout.vue Compute - getNowPageDesktop - Start");
            var vm = this;
            var nowPageVar = vm.$store.state.nowPage;
            if (typeof(nowPageVar) == 'string'){
                //console.log("  nowPageVar:", nowPageVar)
                //console.log("Layout.vue Compute - getNowPageDesktop - End");
                if (nowPageVar == 'home') return 'home';
                switch(nowPageVar[0]){
                  case 'g':
                    return 'girls';
                    break;
                  case 'b':
                    return 'boys';
                    break;
                  case 'a':
                    return 'accessories';
                    break;
                }
            }
        },

        getNowPage(){
            var vm = this;
            return vm.$store.state.nowPage;
        },
        ...mapGetters('cartModules', ['carts', 'cartsLen']),
        ...mapGetters('alertMessageModules', ['messages']),
    },
    created() {
        this.$store.dispatch('cartModules/getCart');
    },
    
  
}

</script>

