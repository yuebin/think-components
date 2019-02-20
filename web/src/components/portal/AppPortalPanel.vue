<style scoped >
.demo-Circle-custom h1{
color: #3f414d;
font-size: 28px;
font-weight: normal;
}
.demo-Circle-custom p{
color: #657180;
font-size: 14px;
margin: 10px 0 15px;
}

.demo-Circle-custom span{
display: block;
padding-top: 15px;
color: #657180;
font-size: 14px;

}
.demo-Circle-custom span:before{
content: '';
display: block;
width: 50px;
height: 1px;
margin: 0 auto;
background: #e0e3e6;
position: relative;
top: -15px;
};
.demo-Circle-customspan i{
font-style: normal;
color: #3f414d;
}
.port-title{
    padding: 16px;
}
.steps{
    padding: 16px;
}
    
</style>
<template>
    <div>
        <Row>
            <Col span="24" class-name="port-title">
                <h3>front-end-baseline-vue</h3>
            </Col>
        </Row>
        <Row class="steps">
            <Steps :current="0">
                <Step title="客户管理" content="客户管理"></Step>
                <Step title="商机管理" content="商机管理"></Step>
                <Step title="销售过程管理" content="销售过程管理"></Step>
                <Step title="投标管理" content="投标管理"></Step>
                <Step title="合同管理" content="合同管理"></Step>
            </Steps>
        </Row>
        <Row :gutter="16" class="steps">
            <Col span="8" class-name="rcl">
                <i-circle :percent="80">
                    <span class="demo-Circle-inner" style="font-size:24px">80%</span>
                </i-circle>
                <span>每日拜访计划</span>
            </Col>
            <Col span="8" class-name="rcl">
                <i-circle :percent="30" stroke-color="#5cb85c">
                    <span class="demo-Circle-inner" style="font-size:24px;color:#5cb85c;">30%</span>
                </i-circle>
                <span>每日销售报告表</span>
            </Col>
            <Col span="8" class-name="rcl">
                <i-circle :percent="60" stroke-color="#ff5500">
                    <span class="demo-Circle-inner" style="font-size:24px;color:#ff5500;">60%</span>
                </i-circle>
                <span>评价推销的效率</span>
            </Col>
        </Row>
    </div>

</template>
<script>

    export default {
        data () {
            return {
            }
        },
        computed: {
        },
        methods: {
        }
    }
</script>
  