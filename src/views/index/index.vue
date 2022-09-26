<template>
    <div class="" id="box">
		<el-row>
        <el-col :span="6" v-for="(o) in tableData" :key="o.itemId">
            <el-card :body-style="{ padding: '30px' }" shadow="hover">
            <img :src="o.imgUrl" class="image">
                <br>
                <!-- <div @click="getDetails">{{o.itemId}} -->
                <span>{{o.title}}</span>
                <div class="bottom clearfix" @click="getDetails">{{o.itemId}}
                    <span>所属分类：{{o.category}}</span>
                    <br>
                    <br>
                    <span>库存:{{o.stock}}</span>
                    <br>
                    <br>
                <time class="time">{{ currentDate }}</time>
                <br>
                <br>
                <el-button  type="text" class="button" @click="dialogTableVisible = true">查看详情</el-button>
            </div>


                <el-dialog title="商品详情" :visible.sync="dialogTableVisible">
                
                    <el-row style="padding-left:80px">
                        <el-col :span="15"><p style="font-color:orange font-size:20px">收货地址：{{Address}}</p>
                            <br>
                            <br>
                            <el-card :body-style="{ padding: '0px' }">
                            <img :src="imgUrl" class="image2">
                            </el-card>
                            <div style="padding: 20px;">
                                <span class="desc1">商品名称：<p class="title">{{ItemDetail.title}}</p></span>
                                <span class="desc2">{{ItemDetail.description}}</span><br><br></br><br>
                                <span class="desc3">劲爆价：{{ItemDetail.price}}元<p></p></span><br><br></br>
                                
                                <p>购买数量：</p><el-input lable="选择数量" v-model="input" placeholder="选择数量"></el-input>
                            </div>
                        </el-col>
                    </el-row>

                    <div slot="footer" class="dialog-footer">
                     <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="danger" @click="dialogTableVisible = false; buy()">支付</el-button></div>>
                  </el-dialog>
                <!-- </div> -->

            </el-card>
        </el-col>
        </el-row>
	</div>
</template>

<script>
import axios from 'axios'
export default {
  
    data() {
    return {
      currentDate: new Date(),
      tableData:[],
      tableData1:[],
      Address:"",
      ItemDetail:{},
      imgUrl:'',
      dialogTableVisible: false,
      itemId:0,
      input:''

    };
            
        },
    mounted(){
        this.getGoodsList()

    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            axios({
            // 请求方式
            method: 'GET',
            // 请求的地址
            url: 'http://10.2.35.47:8080/item/getClientItemList',
            // URL 中的查询参数
            // params: {
            //     id: 1
            // }
            }).then((res) =>{
                console.log(res)
                console.log(res.data)
                this.tableData = Object.assign(res.data)
                console.log(this.tableData)
                
             })

        },
        getDetails(e){
            console.log(e)
            this.itemId = e.currentTarget.innerText.slice(0,6)
            console.log(this.itemId)
            console.log('-----------------------------------')
            axios({
            // 请求方式
            method: 'GET',
            // 请求的地址
            url: 'http://10.2.35.47:8080/item/getItemById',
            // URL 中的查询参数
            params: {
                itemId:this.itemId,
                userId:1
            }
            }).then((res) =>{
                console.log(res)
                console.log(res.data)
                this.tableData1.push(res.data) 
                console.log(this.tableData1)
                console.log(this.tableData1[0].Address)
                console.log(this.tableData1[0].ItemDetail)
                console.log(this.tableData1[0].ItemDetail.imgUrl)
                this.Address = this.tableData1[0].Address
                this.ItemDetail = this.tableData1[0].ItemDetail
                this.imgUrl = this.tableData1[0].ItemDetail.imgUrl
                // console.log(this.Address)
                // console.log(this.ItemDetail)
                // console.log(this.imgUrl)
             })
             this.getGoodsList()

        
    },
    buy(){
        axios({
            // 请求方式
            method: 'GET',
            // 请求的地址
            url: 'http://10.2.35.47:8080/pay/getResult',
            // URL 中的查询参数
            params: {
                userId: 1,
                itemId: this.itemId,
                num: this.input
            }
            }).then((res) =>{
                // console.log(res)
                if(this.input&&res.data.result=='success'){
                    alert("恭喜购买成功！")
                    this.input=''
                }else{
                    alert('购买失败,请稍后再试！')
                }
             }) .catch(error => {
                    console.log("购买失败！")
                    alert("购买失败,请稍后再试！")
             })

             this.getGoodsList()
    }
    // cancel(){
    //     this.getGoodsList()
    // },
}
}
</script>

<style>
    .time {
      font-size: 13px;
      color: #999;
    }
    
    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }
  
    .button {
      padding: 0;
      float: right;
    }
  
    .image {
      width: 100%;
      display: block;
    }
    .image2 {
      width: 100%;
      display: block;
    }
  
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    
    .clearfix:after {
        clear: both
    }
    .desc1{
        font-size: 20px;
        color: rgb(20, 3, 48);
        font-family: Arial, Helvetica, sans-serif;
    }
    .desc2{
        font-size: 20px;
        color: rgb(53, 73, 245);
        font-family: Arial, Helvetica, sans-serif;
        line-height: normal;
    }
    .desc3{
        font-size: 30px;
        color: rgb(241, 3, 3);
        font-family: Arial, Helvetica, sans-serif;
    }
    .title{
        font-size:25px;
        color: brown;
    }
  </style>