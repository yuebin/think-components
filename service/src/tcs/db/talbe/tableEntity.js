import { TCSObject } from "../../TCSObject";

class TableEntity extends TCSObject{
    constructor(){
        super();
        super.defaultProps({}, "tableId", "name", "alias", "code", "notes", "sort", "domainId", "version", "packageId");
    }
}

class ColumsEntity extends TCSObject{

    constructor() {
        super();
        super.defaultProps({}, "id", "tableId", "name", "alias", "code", "type", "comment", "isPk", "generator","length","max","min","validater","sort");
    }

     

}

export { TableEntity }