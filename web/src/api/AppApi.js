
class AppApi{


    constructor(){
        this.POST ={
                UserInfo: { url: "/user/{userid}" },//保存用户信息
                Login: { url: "/admin/login" }
            }
        this.GET = {
                i18n:{url:"/i18n/i18n"},//获取国际化数据
                routers: { url: "/routers/routers" },
                UserInfo: { url: "/user/{userid}" },//获取用户信息
                wheatherInfo: { url: "data/sk/{cityId}.html" }//获取天气预报信息//101010100
            }
        this.DEL = {
                UserInfo: { url: "/user/{userid}" }//删除用户信息
            }
        this.PUT = {
                UserInfo: { url: "/user/{userid}" }//修改用户信息
            }
        this.HEAD = {

        }
        this.OPTIONS= {

        }
    }
}

export default AppApi;