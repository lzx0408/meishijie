import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import {userInfo} from '@/service/api.js'
 
import Home from '@/views/home/Home.vue'
import Login from '@/views/user-login/index.vue'
import Space from '@/views/user-space/space.vue'
import Recipe from '@/views/recipe/recipe.vue'
import Detail from '@/views/detail/detail.vue'
import Create from '@/views/create/create.vue'
import Fans from '@/views/user-space/fans.vue'
import Edit from '@/views/user-space/edit.vue'
import MenuList from '@/views/user-space/menu-list.vue'
import Gouwuche from '@/views/gouwuche/gouwuche.vue'
import Store from '@/store'
const router = new Router({
    mode:"history",
    routes:[
        {
            path:'/',
            name:"Home",
            title:'首页',
            component:Home
        },
        {
            path:'/detail',
            name:"detail",
            title:'详情',
            component:Detail
        },
        {
            path:'/create',
            name:"create",
            title:'发布菜谱',
            component:Create
        },
        {
            path:'/login',
            name:'login',
            title:'登录页',
            component:Login,
            meta:{
                login:true
            },
        },
        {
            path:'/edit',
            name:'edit',
            title:'修改个人空间',
            component:Edit,
            meta:{
                login:true
            },
        },
        {
            path:'/space',
            name:'space',
            title:'我的',
            component:Space,
            redirect:{
                name:'works'
            },
            children:[
                {
                    path:'works',
                    name:'works',
                    title:'作品',
                    component:MenuList,
                    meta:{
                        login:true
                    }
                },
                {
                    path:'fans',
                    name:'fans',
                    title:'我的粉丝',
                    component:Fans,
                    meta:{
                        login:true
                    }
                },
                {
                    path:'following',
                    name:'following',
                    title:'关注',
                    component:Fans,
                    meta:{
                        login:true
                    }
                },
                {
                    path:'collection',
                    name:'collection',
                    title:'收藏',
                    component:MenuList,
                    meta:{
                        login:true
                    }
                }
            ],
            meta:{
                login:true
            },
        },
        {
            path:'/recipe',
            name:'recipe',
            title:'菜谱大全',
            component:Recipe
        },
        {
            path:'/gouwuche',
            name:"gouwuche",
            title:'购物车',
            component:Gouwuche
        },
    ]
});
//路由守卫
router.beforeEach(async (to,from,next) => {
    //next() :是否通过  
    //  参数   ：无         通过
    //          false       不通过
    //          具体地址     跳转到指定的地址
 
    /*
    验证登录
    有些路由是需要登录的，判断登录状态
        1，没有登录：跳转到登录页
        2，登录，直接进入
    有些路由不需要登录，直接进入；
    ps:是否需要登录 --meta
    
    
    */
   const token = localStorage.getItem('token');
   const isLogin = !!token;
   //进入路由的时候，需要向后端发送token，验证是否合法
   const data = await userInfo();
   Store.commit('chageUserInfo',data.data);
   if(to.matched.some(item => item.meta.login)){   //需要登录
    
 
    if(isLogin){ //已经登录的 直接通过
        if(data.error === 400){ //后端告诉你，登录不成功
            next({name:'login'});
            localStorage.removeItem();
            return;
        }
        if(to.name === 'login'){
            next({name:'Home'})
        }else{
            next()
        }
       console.log('1')
        return
    }
    if(!isLogin && to.name ==='login'){  //未登录，但是要去登录页
        next()
        
    }
    if(!isLogin && to.name !== 'login'){ //未登录，去的也不是登录页
        next({name:'login'});
    }
   }else{
       next()
   }
})
 
export default router;