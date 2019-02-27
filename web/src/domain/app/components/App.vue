<style scoped>
</style>
<template>
    <div class="login-continer">
           <h3>App main</h3>
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
            
        }
    }
</script>
  