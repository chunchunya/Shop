<template>
    <div class="header-temp-container">
        <div class="userInfo">
            <el-image :src="userInfo.avatar" class="eImage"></el-image>
            <el-dropdown @command="handleLogout">
                <div class="detail user-link">
                    <span>{{ userInfo.name }}</span>
                    <span>{{ userInfo.desc }}</span>
                    <i class="el-icon--right"></i>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item style="font-size:larger">年龄:{{tableData.age}}</el-dropdown-item>
                        <el-dropdown-item style="font-size:larger">性别:{{tableData.gender}}</el-dropdown-item>
                        <el-dropdown-item style="font-size:larger">电话:{{tableData.telephone}}</el-dropdown-item>
                        <el-dropdown-item style="font-size:larger">地址:{{tableData.address}}</el-dropdown-item>
                        <el-dropdown-item style="font-size:larger" class="banlance">余额:{{tableData.banlance}}</el-dropdown-item>
                        <el-dropdown-item style="font-size:larger" command="logout">退出</el-dropdown-item>
                 
                    </el-dropdown-menu>
                    </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { Message } from "element-ui"
import axios from 'axios'
export default {
    name: "header-temp-container",
    data() {
        return {
            userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
            tableData:[]
        }
    },
    mounted(){
        this.getUserinfo()
    },
    methods: {
        // 退出登录
        handleLogout(key) {
            if(key == "logout") {
                window.localStorage.removeItem("userInfo")
                Message({ type: 'success', message: "退出登录", showClose: true, duration: 3000 })
                this.$router.replace({ path: "/login" })
                location.reload()
            }
        },
        getUserinfo(){
            axios({
            // 请求方式
            method: 'GET',
            // 请求的地址
            url: 'http://10.2.35.47:8080/bxx/get',
            // URL 中的查询参数
            params: {
                id: 1
            }
            }).then((res) =>{
                console.log(res)
                console.log(res.data)
                this.tableData = res.data
                console.log(this.tableData)
             })
        }
    }
}
</script>
<style scoped>
.header-temp-container{border-bottom: 1px solid #ddd; width: 100%;height: 60px;}
.userInfo{display: flex;flex-direction: row;align-items: center;justify-content: flex-end;height: 100%;margin-right: 20px;}
.eImage{width: 40px;height: 40px;border-radius: 50%;margin-right: 10px;}
.detail{display: flex;flex-direction: column;align-items: flex-start;justify-content: space-around;}
.banlance{
    color:red
}
</style>