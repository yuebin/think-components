import { TCSObject } from "TCSObject";

export default class Resource extends TCSObject {

    constructor(){
        super();
        this.defaultProps({},'rid');
    }
}