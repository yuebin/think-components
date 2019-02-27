import { SQLAfterInteceptor } from "./after/SQLAfterInteceptor";

class InteceptorFactory{

    static getInteceptor(inteceptor){
        switch (inteceptor.name) {
            case "SQLAfterInteceptor":
                return new SQLAfterInteceptor();
                break;
        
            default:
                break;
        }
    }

    
}

export { InteceptorFactory }