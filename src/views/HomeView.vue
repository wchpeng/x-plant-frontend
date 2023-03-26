<template>
  <Menu mode="horizontal" @on-select="menuOnSelect" :theme="theme" active-name="1">
      <MenuItem name="1">
          <Icon type="ios-paper" />
          首页
      </MenuItem>
      <MenuItem name="2">
          <Icon type="ios-people" />
          背景
      </MenuItem>
      <div style="float:right;margin-right: 20px;">
        <Button type="primary" size="small" @click="clickAddRhizome">添加作品</Button>&nbsp;&nbsp;&nbsp;
        {{ getNick() }} &nbsp;&nbsp;&nbsp; <a @click="logout" href="">退出登录</a>
      </div>
  </Menu>
  <Modal
    v-model="showAddRhizomeModal"
    title="添加作品"
    @on-ok="clickModalOK"
    :mask-closable="false"
    loading>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="标题" prop="name">
          <Input v-model="formValidate.name" placeholder="作品标题"></Input>
      </FormItem>
      <FormItem label="描述" prop="desc">
          <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="作品描述"></Input>
      </FormItem>
      <FormItem label="整体模型" prop="model1">
          <UploadFile ref="model1" v-model:model-value="formValidate.model1" />
      </FormItem>
      <FormItem label="单根模型" prop="model2">
          <UploadFile v-model:model-value="formValidate.model2" />
      </FormItem>
      <FormItem label="实体对比" prop="model3">
          <UploadFile v-model:model-value="formValidate.model3" />
      </FormItem>
      <FormItem label="数量检测" prop="model4">
          <UploadFile v-model:model-value="formValidate.model4" />
      </FormItem>
      <!-- <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem> -->
    </Form>
  </Modal>
  <RouterView />
</template>
<script>
import UploadFile from '../components/UploadFile.vue'
import {apiAddRhizome} from '@/api/index.js'

  export default {
    components: {
      UploadFile
    },
      data () {
          return {
              theme: 'light',
              showAddRhizomeModal: false,
              formValidate: {
                name: '',
                desc: '',
                model1: [],
                model2: [],
                model3: [],
                model4: []
              },
              ruleValidate: {
                name: [
                  { required: true, message: '标题不能为空', trigger: 'blur' },
                  { type: 'string', min: 1, message: '标题不能为空', trigger: 'blur' }
                ]
              }
          }
      },
      methods: {
        menuOnSelect(name) {
          if (name == '1') {
            this.$router.push('/')
          } else if (name == '2') {
            this.$router.push('/home/bg')
          } else if (name == '3') {
            this.$router.push('/home/rhizome')
          }
        },
        getNick(){
          return sessionStorage.getItem('nick')
        },
        logout(){
          sessionStorage.setItem('token', '');
          sessionStorage.setItem('nick', '');
          this.$router.push('/login')
        },
        clickModalOK() {
          console.log(this.formValidate)
          this.$refs['formValidate'].validate(async (valid) => {
            if (this.formValidate.model1.length == 0 || this.formValidate.model2.length == 0 || this.formValidate.model3.length == 0 || this.formValidate.model4.length == 0){
              this.$Message.error('模型照片不能为空!');
            } 
            if (valid) {
              await apiAddRhizome(this.formValidate);
              this.$Message.success('添加成功');
              this.showAddRhizomeModal = false;
            } else {
              this.$Message.error('添加数据不完整!');
            }
          })
          return false
        },
        clickAddRhizome(){
          this.formValidate.name = '';
          this.formValidate.desc = '';
          this.formValidate.model1 = [];
          this.formValidate.model2 = [];
          this.formValidate.model3 = [];
          this.formValidate.model4 = [];
          this.showAddRhizomeModal = true;
        },
      }
  }
</script>
