<template>
    <div class="form-container">
        <el-card shadow="always">
         <!-- 表格栏 -->
       <el-table :data="tableData" style="width: 100%; font-size: 20px" size="larger" >
         <el-table-column type="selection" width="60" />
         <el-table-column prop="orderId" label="订单编号" align="center" sortable />
         <el-table-column prop="itemId" label="商品编号" align="center"></el-table-column>
         <el-table-column prop="itemPrice" label="订单价格" align="center"></el-table-column>
         <el-table-column prop="amount" label="数量" align="center"></el-table-column>
         <el-table-column prop="playTime" label="支付时间" align="center"/>
         <el-table-column prop="status" label="是否退款" align="center" />
         <el-table-column label="操作" align="center" width="300">
           <template slot-scope="scope">
             <el-button size="large" @click="handleonsale(scope.$index, scope.row)" :disabled="scope.row.status == '已退款'">退款</el-button>
           </template>
         </el-table-column>
       </el-table>
       <!-- 分页栏 -->
       <el-pagination background layout="prev, pager, next" :total="1000" class="fenye"></el-pagination>
     </el-card>
    </div>
</template>

<script>
import axios from 'axios'
 
 export default {
  
   data () {
          return {
            tableData: []
          }
   },
   mounted(){
        this.getOrderList()
   },
    methods: {
        getOrderList(){
            axios({
            // 请求方式
            method: 'GET',
            // 请求的地址
            url: 'http://10.2.35.47:8080/order/list',
            // URL 中的查询参数
            params: {
                userId: 1
            }
            }).then((res) =>{
                console.log(res)
                console.log(res.data)
                this.tableData = Object.assign(res.data)
                console.log(this.tableData)
             })
        },
     handleonsale(index, row) {
        //  console.log(index, row);
         console.log(row);
            axios({
                // 请求方式
                method: 'GET',
                // 请求的地址
                url: 'http://10.2.35.47:8080/order/back',
                // URL 中的查询参数
                params: {
                    orderId: row.orderId
                }
                }).then((res) =>{
                    console.log(res)
                   if(res.data.message=='退款成功'){
                        alert('退款成功！')
                   }
                    this.getOrderList()
                    
                })
        },

     },      
 }
 
 
 </script>
 
 <style scoped lang="css">
 .control-btns {
   margin-bottom: 20px;
 }
 .search-form {
     padding-top: 18px;
     margin-bottom: 15px;
     background-color: #f7f8fb;
 }
 .switch{
   padding-top: 20px;
 }
 .fenye{
   position: relative;;
   right:-1200px;
   top:10px;
 }
 
 
 
 </style>
 