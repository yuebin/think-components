import { TCSObject } from "../../TCSObject";

class ProviderEntity extends TCSObject {

    constructor(dbInitObj){
        super();
        super.dbFiledProps(dbInitObj, 
            "providerId", "providerType", "expl", "params", "validator", "beforeInterceptor", 
            "afterInteceptor", "afterValidator", "remarks","state");
    }
}

export {ProviderEntity}