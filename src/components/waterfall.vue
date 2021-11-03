<template>
  <div class="waterfall" ref="waterfall">
    <slot></slot>
    <div class="waterfall-loading" ref='loading' v-show="isloading">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>
<script>
import {throttle} from "throttle-debounce"
export default {
  name: 'Waterfall',
  data(){
    return {
        isloading:false 
    }
  },
  mounted(){
   this.scrollHanle=throttle(300,this.scroll.bind(this)); 
    window.addEventListener('scroll',this.scrollHanle)
  },
  destroyed(){
    //一个参数事件类型，另一个函数
     window.removeEventListener("scroll",this.scrollHanle);
  },
  methods:{
   scroll(){
     if(this.isloading) return
      if(this.$refs.waterfall.getBoundingClientRect().bottom<document.documentElement.clientHeight){
           console.log("到达可视区"); 
           this.isloading=true  
           this.$emit("view")
      }
    }
  }
}
</script>
<style lang="stylus">
.waterfall-loading
  width 100%
  height 20px
  text-align center
</style>
