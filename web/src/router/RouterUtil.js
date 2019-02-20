
class RouterUtil {

    constructor() {
        if (RouterUtil.instantiation) {
            throw new Error("This class has been instantiated and can be retrieved using the 'RouterUtil.getRouterUtil()' method.");
        }
        this.$router = null;
    }// constructor

    /**
     * 初始化路由实例实现对象
     * @param {route} router 
     */
    initRouter(router){
        if (!this.$router){
            this.$router = router;
        }
    }

    push(location,onComplete,onAbort){
        this.$router.push(location, onComplete, onAbort);
    }
    
    replace(location,onCOmplete,onAbort){
        this.$router.replace(location, onCOmplete, onAbort);
    }

    go(n){
        this.$router.go(n)
    }

    back(){
        this.$router.back();
    }

    forward(){
        this.$router.forward();
    }

    initRoute(router){
        this.$router = router;
    }


    static getRouterUtil(){
        if (!RouterUtil.instantiation){
            RouterUtil.instantiation = new RouterUtil();
        }
        return RouterUtil.instantiation;
    }

}

export default RouterUtil;