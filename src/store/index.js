import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    userInfo: {},
    gwclist:[],
    geshu:0,
  },
  getters:{
    isLogin(state){
      return !!Object.keys(state.userInfo).length;
    }
  },
  mutations:{
    chageUserInfo(state, data){
      state.userInfo = data;
    },
    SET_LIST(state,data){
      state.gwclist=data.gwclist
      state.geshu=data.geshu
    },
    SET_GWC(state,data){
      let {img,name,title,commentsLen,id}=data
      state.geshu++
      let index= state.gwclist.findIndex(item=>item.id==id)
      if(index==-1){
        state.gwclist.push({
          img,name,title,commentsLen,id,num:1
        })
      }else{
        state.gwclist[index].num++
      }
      localStorage.setItem('gwclist',JSON.stringify(state.gwclist))
      localStorage.setItem('geshu',JSON.stringify(state.geshu))
    },
    SET_JISHU(state,data){
      let {id,type}=data
      if(type=='jia'){
        state.gwclist.map(item=>{
          if(item.id==id){
            item.num++
            state.geshu++
          }
        })
      }else{
        state.gwclist.map(item=>{
          if(item.id==id){
            if(item.num==1){
              item.num=1
            }else{
              item.num--
              state.geshu--
            }
          }
        })
      }
      let aj=0
      state.gwclist.map(item=>{
        aj+=(item.price*item.num)
      })
      localStorage.setItem('gwclist',JSON.stringify(state.gwclist))
      localStorage.setItem('geshu',JSON.stringify(state.geshu))
    }
  },
  actions:{
    set_gwc({commit},data){
      commit('SET_GWC',data)
    },
    set_list({commit}){
      commit('SET_LIST',{
        gwclist:JSON.parse(localStorage.getItem('gwclist')) || [],
        geshu:JSON.parse(localStorage.getItem('geshu')) || 0
      })
    },
    set_jijia({commit},data){
      commit('SET_JISHU',data)
    }
  }
})

export default store;