<style scoped>
</style>
<template>
    <div class="client-manager">
        <h3>客户信息</h3>
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
                for(var i=0;i<10;i++){
                    var item = {
                        name: 'Joe Black',
                        date: new Date(),
                        email: 'vue@126.com',
                        gender: '2016-10-02',
                        age:(i+30)
                    }
                    this.data.push(item);
                }
            }
        },
        mounted: function () {
            this.initTablData();
        }
    }
</script>
