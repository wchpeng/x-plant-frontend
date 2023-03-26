<template>
  <Row style="margin-top:30px" align="top" :gutter="16">
    <Col sapn="3" offset="2">
      
      <Menu :theme="theme" :active-name="activeName" @on-select="activeName=$event">
        <MenuItem name="1">
            <Icon type="md-document" />
            作品
        </MenuItem>
        <MenuItem name="2">
            <Icon type="md-chatbubbles" />
            作品详情
        </MenuItem>
      </Menu>
    </Col>
    
    <Col span="16" offset="1">

      <div v-show="activeName=='1'">
        <Row justify="start" :gutter="16">
          <Col span="6" v-for="item in list_params.rhizomeList" :key="item.id">
            <Card class="cart-item">
              <div>
                  <Image :src="item.model1[0].url" fit="fill" />
                  <div style="margin: 10px 0;">{{ item.name }} </div>
                  <Button :type="select_rid==item.id?'primary':'dashed'" size="small" long @click="selectRhizome(item.id)">选中</Button>
              </div>
            </Card>
          </Col>
        </Row>
        <div style="text-align: center; margin: 20px 0;">
          <Page :total="list_params.total" :page-size="list_params.page_size" size="small" @on-change="changePageNo" show-elevator />
        </div>
      </div>

      <div v-show="activeName=='2'">
        <template v-if="select_rid !== null">
          <Collapse v-model="collpaseValue">
            <Panel name="1">
                整体模型
                <template #content>
                  <template v-for="(url, index) in urlList1" :key="url">
                    <Image :src="url" fit="fill" width="200px" style="margin:0 5px 10px" preview :preview-list="urlList1" :initial-index="index" />
                  </template>
                </template>
            </Panel>
            <Panel name="2">
                单根模型
                <template #content>
                  <template v-for="(url, index) in urlList2" :key="url">
                    <Image :src="url" fit="fill" width="200px" style="margin:0 5px 10px" preview :preview-list="urlList2" :initial-index="index" />
                  </template>
                </template>
            </Panel>
            <Panel name="3">
                实体对比
                <template #content>
                  <template v-for="(url, index) in urlList3" :key="url">
                    <Image :src="url" fit="fill" width="200px" style="margin:0 5px 10px" preview :preview-list="urlList3" :initial-index="index" />
                  </template>
                </template>
            </Panel>
            <Panel name="4">
                数量检测
                <template #content>
                  <template v-for="(url, index) in urlList4" :key="url">
                    <Image :src="url" fit="fill" width="200px" style="margin:0 5px 10px" preview :preview-list="urlList4" :initial-index="index" />
                  </template>
                </template>
            </Panel>
          </Collapse>
        </template>
        <template v-else>
          <h2 style="text-align: center;">需要先在作品里选择一个作品！！</h2>
        </template>

      </div>

    </Col>
  </Row>
  
  
</template>
<script>
  import {apiRhizomeList, apiRhizomeDetail, apiAddRhizome, apiModifyRhizome, apiDeleteRhizome} from '@/api/index.js'
  export default {
      data () {
          return {
              select_rid: null,
              activeName: '1',
              theme: 'primary',
              rhizomeDetail: null,
              collpaseValue: '1',
              list_params: {
                rhizomeList: [],
                total: 0,
                page_no: 1,
                page_size: 16
              }
          }
      },
      computed: {
        urlList1() {
          let urls = []
          if (this.rhizomeDetail !== null) {
            for (let i in this.rhizomeDetail.model1) {
              console.log(i)
              urls.push(this.rhizomeDetail.model1[i].url)
            }
          }

          return urls
        },
        urlList2() {
          let urls = []
          if (this.rhizomeDetail !== null) {
            for (let i in this.rhizomeDetail.model2) {
              urls.push(this.rhizomeDetail.model2[i].url)
            }
          }
          return urls
        },
        urlList3() {
          let urls = []
          if (this.rhizomeDetail !== null) {
            for (let i in this.rhizomeDetail.model3) {
              urls.push(this.rhizomeDetail.model3[i].url)
            }
          }
          return urls
        },
        urlList4() {
          let urls = []
          if (this.rhizomeDetail !== null) {
            for (let i in this.rhizomeDetail.model4) {
              urls.push(this.rhizomeDetail.model4[i].url)
            }
          }
          return urls
        }
      },
      methods: {
        selectRhizome(rid){
          this.select_rid = rid;
          sessionStorage.setItem('cache_rid', rid)
          this.getApiRhizomeDetail()
        },
        async getApiRhizomeDetail(){
          // 获取选中的作品详情
          let response = await apiRhizomeDetail(this.select_rid);
          if (response.data.data == null) {
            this.select_rid = null
          } else {
            this.rhizomeDetail = response.data.data;
          }
        },
        async getApiRhizomeList(){
          // 获取所有的作品列表
          let params = {page_no: this.list_params.page_no, page_size: this.list_params.page_size}
          let response = await apiRhizomeList(params);
          this.list_params.total = response.data.data.total;
          this.list_params.rhizomeList = response.data.data.list;
        },
        changePageNo(e) {
          // 翻页时修改页码并重新获取作品列表
          this.list_params.page_no = e;
          this.getApiRhizomeList(); 
        }
      },
      mounted() {
        // 从缓存中读出上次选中的作品id
        let cache_rid = sessionStorage.getItem('cache_rid')
        if (cache_rid !== null){
          this.select_rid = cache_rid
          this.getApiRhizomeDetail()
        }

        // 初次进入页面获取作品列表
        this.getApiRhizomeList()
      }
  }
</script>
<style scoped>
  .cart-item{
    margin-bottom: 16px;
  }
</style>