<template>
  <div class="menu-detail">
    <detail-header :info="menuInfo"></detail-header>
    <detail-content :info="menuInfo"></detail-content>
    <Comment :info="menuInfo"></Comment>
  </div>
</template>
<script>
import DetailHeader from "./detail-header";
import DetailContent from "./detail-content";
import Comment from "./comment";
import { menuInfo } from "@/service/api";
export default {
  components: { DetailHeader, DetailContent, Comment },
  data() {
    return {
      menuInfo: {
        userInfo: {},
        raw_material: {
          main_material: [],
          accessories_material: [],
        },
        steps: [],
      },
    };
  },
  watch: {
    $route: {
      async handler() {
        let { menuId } = this.$route.query;
        if (menuId) {
          //发送请求
          menuInfo({ menuId }).then(({ data }) => {
            this.menuInfo = data.info;
            console.log(this.menuInfo);
          });
        } else {
          this.$message({
            showClose: true,
            message: "请重新进入",
            type: "warning",
          });
        }
      },
      immediate: true,
    },
  },
};
</script>
