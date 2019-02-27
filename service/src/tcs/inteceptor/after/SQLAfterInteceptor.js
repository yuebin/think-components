import { Inteceptor } from "../Inteceptor";
import { Product } from "../../providers/product/Product";

class SQLAfterInteceptor extends Inteceptor{
    
    constructor(){
        super();
    }

    intercept(sqlRes){
        let product = new Product();
        product.data = sqlRes.rows
        return product;
    }

}

export { SQLAfterInteceptor}