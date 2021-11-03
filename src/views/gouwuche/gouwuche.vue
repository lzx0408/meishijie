<template>
  <div class="gouwuche">
      <ul>
          <li class="list" v-for="(item,index) in gwclist" :key="item.id">
              <input type="checkbox" v-model="isgwcxz">
              <img :src="item.img" alt="">
              <div class="list_dv">
                <span>{{item.title}}</span>
                <span>{{item.name}}</span>
                <span>{{item.commentsLen}}评论</span>
              </div>
              <div class="list_but">
                <button @click="jijia(item.id,'jia')">+</button>
                <span>{{item.num}}</span>
                <button @click="jijia(item.id,'jian')">-</button>
              </div>
             <div>
                 <button style="margin-top:1px" @click="addmouve(index)">X</button>
             </div>
          </li>
      </ul>
      <div class="floor">
          <button class="floor_btn" @click="all()">全选</button>
          <button class="floor_btn" @click="del()">删除</button>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            isgwcxz:false
        }
    },
 computed:{
    gwclist(){
      return this.$store.state.gwclist
    }
  },
  created(){
    this.$store.dispatch('set_list')
  },
  methods:{
    jijia(id,type){
      this.$store.dispatch('set_jijia',{id,type})
    },


    addmouve(index){
        this.gwclist.splice(index,1)
    },
    all(){
        this.isgwcxz = true
    },
    del(){
        this.$store.state.gwclist = []
        //  localStorage.setItem('gwclist',JSON.stringify(value));
    }
  },


  watch:{
      gwclist:{
        handler(value){
            localStorage.setItem('gwclist',JSON.stringify(value));
        }
    
    }
  }
}
</script>

<style scoped>
.list{
    width: 100%;
    height: 232px;
    display: flex;
    background: red;
}
img{
    width: 232px;
    height: 232px;
}
.list_dv{
    width: 650px;
    display: flex;
    flex-direction: column;
    background: yellow;
    /* justify-content: center; */
}
span{
    font-size: 16px;
    padding-top: 42px;
}

button{
    width: 20px;
    height: 20px;
    margin-top: 100px;
}
.floor{
    width: 100%;
    height: 50px;
    /* background: coral; */
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.floor_btn{
    width: 50px;
    height: 30px;
    font-size: 16px;
    margin-top: 1px;
}
</style>