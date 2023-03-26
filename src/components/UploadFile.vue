<template>

  <div class="demo-upload-list" v-for="(item, idx) in value" :key="idx">
    <Image :src="item.url" fit="cover" width="100%" height="100%" />
    <div class="demo-upload-list-cover">
        <Icon type="ios-eye-outline" @click="handleView(item.url)"></Icon>
        <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
    </div>
  </div>
  
  <div class="demo-upload-list">
    <Upload
        :show-upload-list="false"
        :before-upload="handleUpload"
        :format="['jpg','jpeg','png']"
        action="http://127.0.0.1:8080/api/account/upload/v1"
        multiple
        style="display: inline-block;width:58px;">
        <div style="text-align:center;width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-cloud-upload-outline" size="20"></Icon>
        </div>
    </Upload>
  </div>
  <ImagePreview v-model="visible" :preview-list="[imgName]" />
</template>
<script>
import {apiUploadImage} from '@/api/index.js'
  export default {
    props: {
      modelValue: Array
    },
    emits: ['update:modelValue'],
    data () {
        return {
          imgName: '',
          visible: false
        }
    },
    computed: {
      value: {
        get() {
          return this.modelValue
        },
        set(value) {
          console.log(value)
          value = JSON.parse(JSON.stringify(value))
          console.log('emit update:modelValue, value', value)
          this.$emit('update:modelValue', value)
          return true
        }
      }
    },
    methods: {
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (file) {
        let index = this.value.indexOf(file)
        this.value.splice(index, 1);
      },
      uploadHeaders() {
        return {Authorization: sessionStorage.getItem('token')}
      },
      async handleUpload(file) {
        let response = await apiUploadImage(file)
        this.value.push({url: 'http://127.0.0.1:8080' + response.data.data.url})
        return false
      }
    },
    mounted() {
    }
  }
</script>
<style scoped>
.demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>