<template>
  <el-upload
    class="avatar-uploader"
    :action="action"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
// import {}
export default {
  props:{
    action:String,
    maxSize:{
      type:Number,
      default:2
    },
    imageUrl:{
      type:String,
      default:''
    },
    imgMaxWidth:{
      type:[String,Number],
      default:'auto'
    }
  },
  data(){
    return {
 
    }
  },
  methods: {
    // 图片上传成功之后
    handleAvatarSuccess(res, file) {
      console.log(file);
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      if(res.code===1){
        this.$message({
          message:res.mes,
          type:'warning'
        })
        // return;
      }
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit('res-url',{
        resImgUrl:URL.createObjectURL(file.raw)
      })
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      // 限制图片类型
      const isJPG = file.type === 'image/jpeg';
      // 限制图片内存大小
      const isLt2M = file.size / 1024 / 1024 < 2;
 
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>
 
<style lang="stylus">
  .avatar
    width  210px
</style>