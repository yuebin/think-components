<style scoped>
</style>
<template>
    <div class="client-manager">
        <h3>客户信息</h3>
        <Button type="primary">loading</Button>
        <Table border :columns="columns" :data="data"></Table>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns:[
                    {title:"姓名",key: "name",sortable: true},
                    {title:"日期",key: "date",sortable: true},
                    {title:"邮箱",key: "email",sortable: true},
                    {title:"性别",key: "gender",sortable: true},
                    {title:"年龄",key: "age",sortable: true}
                ],
                data: []
            }
        },
        computed: {
        },
        methods: {
            initTablData (){
                this.data = new Array();
                var queryParams = {
                    cityId: "101010100"
                }
                this.$http.getAppData("wheatherInfo",queryParams).then(function(response){
                    console.log(response);
                }).catch(function(error){
                    console.error(error);
                });
            }
        },
        mounted: function () {
            this.initTablData();
        }
    }
</script>
