<template>
  <template v-if="$refs.upload">
    <div class="demo-upload-list" v-for="(item, idx) in $refs.upload.fileList" :key="idx">
      <!-- <template v-if="item.status === 'finished'"> -->
          <Image :src="item.url" fit="cover" width="100%" height="100%" />
          <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click="handleView(item.url)"></Icon>
              <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
          </div>
      <!-- </template>
      <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template> -->
    </div>
  </template>
  
  <Upload
      ref="upload"
      :headers="uploadHeaders()"
      name="file"
      :show-upload-list="false"
      :default-file-list="[]"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      multiple
      action="http://127.0.0.1:8080/api/account/upload/v1"
      style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20">上传多图</Icon>
      </div>
  </Upload>
  <ImagePreview v-model="visible" :preview-list="[imgName]" />
</template>
<script>
  export default {
    props: {
      modelValue: Array
    },
    emits: ['update:modelValue'],
    data () {
        return {
          imgName: '',
          visible: false,
          defaultList: [],
          uploadList: []
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
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      uploadHeaders() {
        return {Authorization: sessionStorage.getItem('token')}
      },
      handleSuccess(response, file, file_list) {
        // 传图成功回调
        console.log('success: ', response, file)
        file.url = 'http://127.0.0.1:8080' + response.data.url
        this.value = file_list;
        this.uploadList = this.$refs.upload.fileList;
      }
    },
    mounted() {
      this.uploadList = this.$refs.upload.fileList;
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