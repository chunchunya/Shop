<template>
    <div>
     <el-card shadow="always">
         <!-- 表格栏 -->
       <el-table :data="tableData" style="width: 100%; font-size: 20px" size="larger" >
         <el-table-column type="selection" width="60" />
         <el-table-column prop="itemId" label="商品编号" align="center" sortable />
         <el-table-column prop="title" label="商品名称" align="center"></el-table-column>
         <el-table-column prop="description" label="描述" align="center"></el-table-column>
         <el-table-column prop="sales" label="销售额" align="center"></el-table-column>
         <el-table-column prop="category" label="种类" align="center"/>
         <el-table-column prop="stock" label="库存" align="center" />
         <el-table-column label="操作" align="center" width="300">
           <template slot-scope="scope">
             <el-button size="large" @click="handleonsale(scope.$index, scope.row)" :disabled="scope.row.isOnsale == 1">上架</el-button>
             <el-button size="large" @click="handleoutsale(scope.$index, scope.row)" :disabled="scope.row.isOnsale == 0">下架</el-button>
             <el-button size="large"  type="danger" @click="handledelete(scope.$index, scope.row)">删除</el-button>
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
        this.getGoodsList()
   },
    methods: {
        getGoodsList(){
            axios({
            // 请求方式
            method: 'GET',
            // 请求的地址
            url: 'http://10.2.35.47:8080/managementProducts/getItemList',
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
     handleonsale(index, row) {
        //  console.log(index, row);
         console.log(row);
            axios({
                // 请求方式
                method: 'GET',
                // 请求的地址
                url: 'http://10.2.35.47:8080/managementProducts/onsale',
                // URL 中的查询参数
                params: {
                    itemId: row.itemId
                }
                }).then((res) =>{
                    console.log(res.data.result)
                    alert("上架成功！")
                    this.getGoodsList()
                    
                })
        },
         
     handleoutsale(index, row) {
        axios({
                // 请求方式
                method: 'GET',
                // 请求的地址
                url: 'http://10.2.35.47:8080/managementProducts/outsale',
                // URL 中的查询参数
                params: {
                    itemId: row.itemId
                }
                }).then((res) =>{
                    console.log(res.data.result)
                    alert("下架成功！")
                    this.getGoodsList()
                    
                })
       },
       handledelete(index, row) {
        //  console.log(index, row);
         console.log(row);
            axios({
                // 请求方式
                method: 'DELETE',
                // 请求的地址
                url: 'http://10.2.35.47:8080/managementProducts/delete',
                // URL 中的查询参数
                params: {
                    itemId: row.itemId
                }
                }).then((res) =>{
                    console.log(res.data.result)
                    alert("删除成功！")
                    this.getGoodsList()
                    
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
 