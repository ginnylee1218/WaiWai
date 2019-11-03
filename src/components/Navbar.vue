<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-primary flex-nowrap p-0 shadow">
        <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/">Wai Wai</router-link>
        <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
            <a class="nav-link text-white" href="#" @click="logout"><i class="fas fa-sign-out-alt"></i></a>
            </li>
        </ul>
    </nav>
  </div>

</template>

<script>
export default {
  data () {
    return {
    
    }
  },
  methods: {
    logout(){
      const vm = this;
        const api = `${process.env.VUE_APP_APIPATH}/logout`
        this.$http.post(api).then((response) => {
            console.log(response.data)
            if(response.data.success){
                vm.$router.push("/")
            }
        })
    }
  },
}
</script>


<style scoped>

</style>
