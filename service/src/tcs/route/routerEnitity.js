import {TCSObject} from "../TCSObject"

class RouterEntity extends TCSObject {

    constructor(rowRouter){
        super();
        this.dbFiledProps(rowRouter,"routerId","rDomain",
        "module","rVersion","methodName","beforeProcessor",
        "provider","afterProcessor","explainText","state","params",
        "query","path");
    }

    getRouterMatchKey(){
        return `${this.rDomain}@${this.module}@${this.path}@${this.methodName}`
    }

    matchRouter(reqRouter){
        let routerKeyTmpl = `${reqRouter.rDomain}@${reqRouter.module}@${reqRouter.path}@${reqRouter.methodName}`;
        if(this.getRouterMatchKey() == routerKeyTmpl){
            return this;
        }else {
            return null;
        }
    }
}

export { RouterEntity }

