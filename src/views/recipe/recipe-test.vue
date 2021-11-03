<template>
    <div class="recipe">
        <el-tabs type="border-card"
                 v-model="classifyName"
        >
             <el-tab-pane 
                    v-for="item of classify" 
                    :key="item.parent_type" 
                    :label="item.parent_name"
                    :name="item.parent_type"
                    >
            
                <div class="recipe-link">

                        <router-link v-for="option of item.list"
                            :to='{query:{...$router.query,classify:option.type}}'
                            :key="option.type"
                            :class="{active:classifyType == option.type}"
                        >
                             {{option.name}}
                        </router-link>
                </div>
             </el-tab-pane>
        </el-tabs>

        <h2>家常好味道，给你家一般的温暖</h2>

        <el-container>
            <el-aside width="220px" class="recipe-aside">
                <div class="filter-box">
                    <h4>筛选</h4>
                      <el-collapse v-model="propertiesActivName">
                         <el-collapse-item
                             v-for="item of properties" :key="item.parent_type"
                             :title="item.parent_name" :name="item.parent_type">
                            <div class="filter-tags">
                           
                             <el-tag
                                v-for="option in item.list"
                                :key="option.type"
                                 type="info"
                                 @click="selectedTag(option)"
                                 :class="{'tag-selected': propertyType[item.title] == option.type}"
                             >
                                {{option.name}}
                             </el-tag>
                            </div>
                         </el-collapse-item>
                        </el-collapse>
                </div>
            </el-aside>
            <el-main>
                右侧主体
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import MenuCard from '@/components/menu-card.vue'
    import {getClassify, getProperty, getMenus} from '@/service/api';
    import { callbackify } from 'util';
    export default {
        components: {MenuCard},
        data() {
            return {
                classify:[],  //菜谱原始数据
                classifyType:"1-1", //菜谱active所需的 type值
                classifyName:'1', // 保存菜谱的状态值
                properties:[],   // 属性的原始数据
                propertyType:{}, // 记录属性的分类，有多个  {a:'1-2',b:'2-1'}
                propertiesActivName:[]  //记录所有的属性分类
            }
        },
        watch: {
            $route: {
                    handler(){
                        const {classify} = this.$route.query;
                        this.classifyType = classify;
                        this.classifyName = classify[0];
                      
                    },
                    immediate:true //立即执行
            }
        },
        mounted() {
                 getClassify().then(({data})=>{
                    // console.log(data);
                    this.classify = data;
                 });
                 getProperty().then(({data})=>{
                    //  console.log(data);
                        this.properties = data;
                        const {query} = this.$route;  // {craft:'1-1',flavor: '2-1',hard: '3-2' }
                       
                       //传递空对象，来保存每次的参数值
                       this.propertyType = this.properties.reduce((o, item) => {
                            o[item.title] = query[item.title] ? query[item.title] : '';
                            if(o[item.title]){
                                 this.propertiesActivName.push(o[item.title][0]);
                            }
                            return o;
                        },{});
                        console.log(this.propertyType);
                 });
        },
        methods: {
            selectedTag(option){
                console.log(option);
                let query = {...this.$route.query};
                //点击时：如果为选中就清空，否则就选中
                if(this.propertyType[option.title] === option.type) {
                    this.propertyType[option.title] = '';
                    delete query[option.title];
                }else {
                    this.propertyType[option.title] = option.type;
                    query[option.title] = option.type;
                }
                // 地址栏记录选中的属性
                this.$router.push({
                    query
                })
            }
        }
    }
</script>
<style lang="stylus">
    .recipe-link
        font-size 0;
        margin-top 5px

        a
            display inline-block
            font-size 12px
            padding 0px 8px
            height 28px
            line-height 28px

        .active
            background #ff3232
            color #fff

    .recipe
        h2
            text-align center
            line-height 150px

        .el-main
            padding 0

        .filter-box
            background #fff
            padding 10px
            width 100%
            float left
            box-sizing border-box

    .filter-tags
        display flex
        flex-wrap wrap
        justify-content space-around

        .tag-selected
            background-color #ff3232
            color #fff

    .menu-empty
        width 100%
        text-align center
        font-size 20px
</style>

