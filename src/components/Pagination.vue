<template>
 <div>
    <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{'disabled': !Pages.has_pre}">
                <a class="page-link"  href="#" aria-label="Previous" @click.prevent="getPages(Pages.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for="page in Pages.total_pages" :key="page"
            :class="{'active': page == Pages.current_page}">
                <a class="page-link" href="#" @click.prevent="getPages(page)">{{page}}</a>
            </li>
            <li class="page-item" :class="{'disabled': !Pages.has_next}">
                <a class="page-link"  href="#" aria-label="Next" @click.prevent="getPages(Pages.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
 </div>
</template>



<script>

export default {
  props:{
    Pages: {
      type: Object,
    }
  },
  data () {
    return {
    
    }
  },
  methods: {
      getPages(page){
          this.$emit('emitGetPages',Number(page))
      }
  },
 
}
</script>
<style lang="scss" scoped>
    nav{
        box-shadow: none;
    }
</style>