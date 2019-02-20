import { Resource } from "../resource";

export default class Route extends Resource{
    
    constructor(){
        super();
        this.defaultProps({}, 'routeId', 'domain', 'module', 'consumer', 'creater', 'createTime', 'lastUpdateTime','remark');
        this.createTime = new Date();
        this.lastUpdateTime = new Date();
    }
}