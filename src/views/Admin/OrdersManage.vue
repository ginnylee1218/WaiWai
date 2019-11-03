<template>
  <div>
    <div class="table-responsive-xl mt-5">
      <table class="table nowrap">
        <thead>
          <tr>
            <th class="text-center">購買時間</th>
            <th class="d-sm-table-cell d-none text-center">Email</th>
            <th class="d-lg-table-cell d-none text-center">購買款項</th>
            <th class="text-center">應付金額</th>
            <th class="d-sm-table-cell d-none text-center">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="{ 'bg-light' :order.is_paid }" v-for="order in orders" :key="order.id">
            <td class="text-center">{{ order.create_at | date }}</td>
            <td class="d-sm-table-cell d-none" v-if="order.user">{{ order.user.email }}</td>
            <td class="d-lg-table-cell d-none">
              <ul class="list-unstyled">
                <li v-for="(order_product, i) in order.products" :key="i">
                  {{order_product.product.title}}:{{order_product.qty}}
                   {{order_product.product.unit}}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ order.total | currency }}</td>
            <td class="d-sm-table-cell d-none text-center">
              <strong class="text-success" v-if="order.is_paid">已付款</strong>
              <span class="text-muted" v-else>尚未付款</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
   <Pagination :Pages="pagination" @emitGetPages="getOrders" class="mt-5" v-if="pagination.total_pages > 1"></Pagination>



  </div>
</template>

<script>

import $ from 'jquery';
export default {
  data () {
    return {
        orders:[],
        pagination:{},
    }
  },
  methods: {
    getOrders(page = 1){
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
        const vm = this;
        vm.$store.dispatch('updateLoading' , true);
        this.$http.get(api).then((response) => {
            //console.log(response.data)
            if (response.data.success) {
              vm.orders = response.data.orders;
              vm.pagination = response.data.pagination;
            }
            vm.$store.dispatch('updateLoading' , false);
        })
    },
    
    
    
  },
  created() {
      this.getOrders();
  },
  
}
</script>

<style lang="scss" scoped>
.nowrap {
  white-space: nowrap;
}
</style>