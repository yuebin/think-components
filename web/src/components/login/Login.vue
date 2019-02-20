<style scoped>
.login-continer{
    width: 100%;
    height: 100%;
    text-align: center;
}
.login-box{
    width: 400px;
    height: 260px;
    padding: 35px;
    color: #EEE;
    position: absolute;
    left: 50%;
    top: 40%;
    margin-left: -200px;
    margin-top: -100px;
    border: 1px solid #e3e3e3;
    border-radius: 8px;
}
.login-input{
    padding: 12px;
}
.login-buttons{
    padding: 6px;
}
.ivu-input{
    height: 40px !important;
}

</style>
<template>
    <div class="login-continer">
           <div class="login-box">
                <div class="login-input">
                    <Input class="m-input" name="busername" size="large" v-model="user.userName" placeholder="请输入用户名" style="width: 300px"></Input>
                </div>
                <div class="login-input">
                    <Input class="m-input" name="bpassword"  size="large" type="password" v-model="user.password" placeholder="请输入密码" style="width: 300px"></Input>
                </div>
                <div class="login-buttons">
                    <Button type="success" @click="login()">登陆</Button>
                </div>
           </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                user:{
                    userName:"",
                    password:""
                }
            }
        },
        computed: {
        },
        methods: {
            login(){
                this.$store.dispatch('login', this.user);
            }
        },
        mounted:function () {
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'login') {

                }
                console.log(mutation.type)
                console.log(mutation.payload)
            })
        }
    }
</script>
  