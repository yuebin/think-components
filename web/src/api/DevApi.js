class DevApi {

    constructor() {
        this.POST = {
            UserInfo: { url: "/user/{userid}" },//保存用户信息
        }
        this.GET = {
            routers: { url: "/routers/routers" },
            packages: { url:"/packages/packages"}
        }
        this.DEL = {
            UserInfo: { url: "/user/{userid}" }//删除用户信息
        }
        this.PUT = {
            UserInfo: { url: "/user/{userid}" }//修改用户信息
        }
        this.HEAD = {

        }
        this.OPTIONS = {

        }
    }

}
export default DevApi;