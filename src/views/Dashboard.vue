<template>
 <div>
    <loading :active.sync="isLoading" ></loading>
    <Navbar/> 
    <div class="container-fluid">
        <div class="row">
            <Sidebar/>
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <router-view></router-view>
            </main>
        </div>
    </div>
 </div>
</template>



<script>
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import Alert from '@/components/AlertMessage';

export default {
  data () {
    return {
    
    }
  },
  components:{
      Sidebar,
      Navbar,
      Alert,
  },
  computed: {
    isLoading(){
        return this.$store.state.isLoading;
    },
  },
}
</script>

<style lang="scss" scoped>
[role="main"] {
    padding-top: 60px;
}
</style>