<style scoped>
.ivu-layout-content{
    border-radius: 8px;
    padding:6px;
}
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .ivu-layout-sider-collapsed img{
        width: 50px;
        transition: width .2s ease;
    }
    .ivu-layout-sider-collapsed  .submenu-title{
        display: none;
        transition: width .2s ease;
    }
    .ivu-layout-sider-collapsed .submenu-menu-item-title{
        display: none;
        transition: width .2s ease;
    }
    .ivu-layout-sider-collapsed .ivu-icon{
        font-size: 18px;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider on-collapse="onCollapse()" ref="side1" hide-trigger collapsible :collapsed-width="94" v-model="isCollapsed">
                <div class="avater">
                    <router-link to="/portal">
                        <div class="avdter-img">
                            <img src="../assets/images/timg.jpeg" alt="">
                        </div>
                    </router-link>
                </div>
               <Menu  active-name="currentActiveName"  theme="dark" width="auto" :open-name="['a']" >
                    <Submenu :name="mainMenu.code" :title="mainMenu.name" v-for="mainMenu in mainEenus">
                        <template slot="title">
                            <Icon :type="mainMenu.iconType"></Icon>
                            <span class="submenu-title">{{mainMenu.name}}</span>
                        </template>
                        <MenuItem :name="menu.code" v-for="menu in mainMenu.menus" :title="menu.name" @click.native="selectMenu(mainMenu,menu)">
                            <Icon :type="menu.iconType"></Icon>
                            <span class="submenu-menu-item-title">{{menu.name}}</span>
                        </MenuItem>
                    </Submenu>
               </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isCollapsed: false,
                isAccordion: false,
                currentActiveName: "clinet-a",
                mainEenus: [
                    {name:"客户管理",code:"clinet",iconType:"person-stalker",path:"/clinet",currActive:"",menus:[
                        {name:"新客户填报",code:"clinet-a",path:"/list",iconType:"ios-list-outline"},
                        {name:"客户信息维护",code:"clinet-b",path:"/from",iconType:"ios-compose-outline"},
                        {name:"客户信息审核",code:"clinet-c",path:"/http",iconType:"pull-request"},
                        {name:"客户档案",code:"clinet-d",path:"/notice",iconType:"ios-paper-outline"}
                    ]},
                    {name:"商机管理",code:"business",iconType:"cash",path:"/business",currActive:"",menus:[
                        {name:"商机报备",code:"business-a",path:"/a",iconType:"ios-paper-outline"},
                        {name:"商机维护",code:"business-b",path:"/b",iconType:"ios-compose-outline"},
                        {name:"工作报告",code:"business-c",path:"/c",iconType:"stats-bars"}
                    ]},
                    {name:"销售过程管理",code:"sale-process",iconType:"coffee",path:"/saleprocess",currActive:"",menus:[
                        {name:"预立项申请",code:"sale-process-a",path:"/a",iconType:"ios-pricetag"},
                        {name:"销售跟进",code:"sale-process-c",path:"/b",iconType:"aperture"},
                        {name:"工作报告",code:"sale-process-d",path:"/c",iconType:"stats-bars"}
                    ]}
                ]
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            selectMenu(parentMenu,currMenuItem){
                var path = "/app"+parentMenu.path + currMenuItem.path;
                this.currentActiveName = currMenuItem.code;
                //this.$router.push(path);
                this.$navPush(path);
            }
        }
    }
</script>
  